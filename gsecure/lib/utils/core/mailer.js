import nodemailer from 'nodemailer';

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_PORT == 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

export const sendMail = async ({ to, subject, html }) => {
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail({
            from: process.env.SUPPORT_EMAIL || process.env.SMTP_USER,
            to,
            subject,
            html,
        });
        console.log("Message sent: ", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email: ", error);
        return { success: false, error };
    }
};
