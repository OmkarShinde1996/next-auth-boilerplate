import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import {WrappletResetPasswordSuccessEmail} from '@/emails/reset-password-success'
import {WrappletResetPasswordEmail} from '@/emails/reset-password-email'

const from = '"Wrapplet" <wrappletinfo@gmail.com>'
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.NEXT_PUBLIC_SMTP_EMAIL,
        pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
    },
});




export async function sendPasswordResetEmail(email, token) {
    // const resetPasswordUrl = `http://localhost:3000/resetPassword/${token}`;
    const resetPassEmail = render(<WrappletResetPasswordEmail resetPasswordLink={`${process.env.NEXT_PUBLIC_URL}resetPassword/${token}`} />);
    console.log({token, email});
    const info = await transporter.sendMail({
        from: from,
        to: email,
        subject: "Password Reset Request",
        // html: `Hi, <br/><br/>We received password reset request for your wrapplet account. Please click on the following link to reset your password: <br/><br/><a href="${resetPasswordUrl}">Reset Password</a> <br/><br/>Note: This link is only valid for 3 hours after which it will be invalid.<br/><br/>If you did not request a password reset, please ignore this email.`,
        html: resetPassEmail,
    });
    console.log("Reset password message sent:", info.messageId);
}

export async function sendPasswordResetSuccessEmail(email) {
    console.log({email});
    const resetPassSuccessEmail = render(<WrappletResetPasswordSuccessEmail resetPassUrl={`${process.env.NEXT_PUBLIC_URL}resetPassword`} supportUrl={'#'} updatedDate={new Date()}/>);
    const info = await transporter.sendMail({
        from: from,
        to: email,
        subject: "Password Reset Success",
        // html: `Hi, <br/><br/> This is to inform you that you have successfully resetted your password.<br/><br/>Now you can login using your new password.`,
        html: resetPassSuccessEmail,
    });
    console.log("Success reset password message sent:", info.messageId);
}