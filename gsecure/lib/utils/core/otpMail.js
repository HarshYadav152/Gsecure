import { sendMail } from './mailer.js';

export const sendOtpEmail = async (userEmail, otp) => {
    const subject = "Password Reset OTP - Gsecure";

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
            <h2 style="color: #333; text-align: center;">Forgot Your Password?</h2>
            <p style="color: #555; font-size: 16px;">
                You requested a password reset. Please use the following One-Time Password (OTP) to reset your password. 
                This OTP is valid for the next 10 minutes.
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <span style="display: inline-block; padding: 10px 20px; font-size: 24px; font-weight: bold; color: #fff; background-color: #007bff; border-radius: 5px; letter-spacing: 5px;">
                    ${otp}
                </span>
            </div>
            <p style="color: #555; font-size: 16px;">
                If you did not request a password reset, please ignore this email or contact support if you have concerns.
            </p>
            <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;">
            <p style="color: #888; font-size: 12px; text-align: center;">
                &copy; ${new Date().getFullYear()} Gsecure. All rights reserved.
            </p>
        </div>
    `;

    return await sendMail({ to: userEmail, subject, html });
};

export const sendPasswordUpdateConfirmation = async (userEmail) => {
    const subject = "Password Updated - Gsecure";

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
            <h2 style="color: #333; text-align: center;">Password Updated</h2>
            <p style="color: #555; font-size: 16px;">
                Your password was successfully updated. If you did not make this change, please contact support immediately.
            </p>
             <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;">
            <p style="color: #888; font-size: 12px; text-align: center;">
                &copy; ${new Date().getFullYear()} Gsecure. All rights reserved.
            </p>
        </div>
    `;

    return await sendMail({ to: userEmail, subject, html });
}
