import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getUserByResetPasswordToken, updatePassword } from '@/lib/queries'
import { hash } from 'bcryptjs';
import { sendPasswordResetSuccessEmail } from '@/lib/mail';

export const POST = async (request) => {
  const { password, token } = await request.json();

  //fetch user from db where token match
  const user = await getUserByResetPasswordToken(token);
  if (user.length !== 0 && user[0]?.emailResetPassword === token) {
    const hashedPassword = await hash(password, 10); //hashing the password
    // update the password in DB
    const updateNewPassword = await updatePassword(user[0].email, hashedPassword)
    if(!updateNewPassword) {
        return NextResponse.json({
            status: 400,
            body: 'Something went wrong! Please try after sometime.',
        })
    }

    // Send the password reset email with the token
    await sendPasswordResetSuccessEmail(user[0].email);

    return NextResponse.json({ status: 200, body: "Password reset succesful!" });
  } else {
    // Respond with a generic message whether or not the email was found
    // This is a security measure to prevent email enumeration
    return NextResponse.json({ status: 200, body: "Something went wrong! Please try after sometime." });
  }
};