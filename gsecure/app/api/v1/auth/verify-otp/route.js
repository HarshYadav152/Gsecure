import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/models/User";
import OTP from "@/lib/models/OTP";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        await connectDB();
        const { identifier, otp } = await request.json();

        if (!identifier || !otp) {
            return NextResponse.json({ success: false, message: "Identifier and OTP are required" }, { status: 400 });
        }

        // Find user
        const user = await User.findOne({
            $or: [{ email: identifier.toLowerCase() }, { username: identifier.toLowerCase() }]
        });

        if (!user) {
            return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
        }

        // Find the most recent OTP for the user
        const otpRecord = await OTP.findOne({ userId: user._id }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return NextResponse.json({ success: false, message: "No OTP request found" }, { status: 400 });
        }

        // Check if OTP is used
        if (otpRecord.isUsed) {
            return NextResponse.json({ success: false, message: "OTP has already been used" }, { status: 400 });
        }

        // Check if OTP is expired
        if (new Date() > otpRecord.expiresAt) {
            return NextResponse.json({ success: false, message: "OTP has expired" }, { status: 400 });
        }

        // Check attempts
        if (otpRecord.attempts >= 3) {
            return NextResponse.json({ success: false, message: "Too many failed attempts. Request a new OTP." }, { status: 400 });
        }

        // Verify the OTP hash
        const isMatch = await bcrypt.compare(otp.toString(), otpRecord.otpHash);

        if (!isMatch) {
            // Increment attempts
            otpRecord.attempts += 1;
            await otpRecord.save();
            return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
        }

        // OTP is valid, mark as used
        otpRecord.isUsed = true;
        await otpRecord.save();

        // Generate a short-lived reset token (JWT) valid for 5 minutes
        const resetToken = jwt.sign(
            { userId: user._id, type: 'password_reset' },
            process.env.ACCESS_TOKEN_SECRET, // Make sure you have a securely stored secret
            { expiresIn: '5m' }
        );

        return NextResponse.json({
            success: true,
            message: "OTP verified successfully",
            resetToken
        }, { status: 200 });

    } catch (error) {
        console.error("Verify OTP Error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
