import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/models/User";
import OTP from "@/lib/models/OTP";
import { sendPasswordUpdateConfirmation } from "@/lib/utils/core/otpMail";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        await connectDB();
        const { resetToken, newPassword } = await request.json();

        if (!resetToken || !newPassword) {
            return NextResponse.json({ success: false, message: "Reset token and new password are required" }, { status: 400 });
        }

        // Validate password length
        if (newPassword.length < 6) {
            return NextResponse.json({ success: false, message: "Password must be at least 6 characters long" }, { status: 400 });
        }

        let decoded;
        try {
            decoded = jwt.verify(resetToken, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            return NextResponse.json({ success: false, message: "Invalid or expired reset token" }, { status: 400 });
        }

        if (decoded.type !== 'password_reset') {
            return NextResponse.json({ success: false, message: "Invalid token type" }, { status: 400 });
        }

        const user = await User.findById(decoded.userId);

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Update password (hashing happens in User model pre-save hook)
        user.password = newPassword;
        await user.save(); // passwordChangedAt is also set in the pre-save hook 

        // Invalidate any remaining OTPs for this user
        await OTP.deleteMany({ userId: user._id });

        // Send confirmation email
        await sendPasswordUpdateConfirmation(user.email);

        return NextResponse.json({
            success: true,
            message: "Password reset successful"
        }, { status: 200 });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
