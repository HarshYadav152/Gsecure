import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/models/User";
import OTP from "@/lib/models/OTP";
import { sendOtpEmail } from "@/lib/utils/core/otpMail";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(request) {
    try {
        await connectDB();
        const { identifier } = await request.json(); // identifier can be email or username

        if (!identifier) {
            return NextResponse.json({ success: false, message: "Email or username is required" }, { status: 400 });
        }

        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email: identifier.toLowerCase() }, { username: identifier.toLowerCase() }]
        });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Generate a 6-digit OTP
        const otpValue = crypto.randomInt(100000, 999999).toString();

        // Hash the OTP before saving to DB
        const salt = await bcrypt.genSalt(10);
        const otpHash = await bcrypt.hash(otpValue, salt);

        // Delete any existing unused OTPs for this user to prevent confusion
        await OTP.deleteMany({ userId: user._id });

        // OTP expires in 10 minutes
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // Create new OTP document
        await OTP.create({
            userId: user._id,
            otpHash,
            expiresAt
        });

        // Send OTP via email
        const mailResult = await sendOtpEmail(user.email, otpValue);

        if (!mailResult.success) {
            return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "OTP sent to your registered email addressing"
        }, { status: 200 });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
