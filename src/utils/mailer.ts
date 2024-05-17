import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs"
type SendEmailOptions = {
    email: string;
    emailType: 'VERIFY' | 'RESET';
    userId: string;
};

export const sendEmail = async ({ email, emailType, userId }: SendEmailOptions): Promise<void> => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            }
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000}
            })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "62085b8a0e4d9d",
                pass: "a715509d23401e"
            }
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.EMAIL || '',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'} or copy and paste the link below in your browser .<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}`,
        };

        await transport.sendMail(mailOptions);

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to send email: ${error.message}`);
        } else {
            throw new Error(`Unexpected error occurred: ${error}`);
        }
    }
};
