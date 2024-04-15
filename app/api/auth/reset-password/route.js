import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getUserByEmail, updateResetPasswordToken } from '@/lib/queries'
import { sendPasswordResetEmail } from '@/lib/mail';

export const POST = async (request) => {
  const { email } = await request.json();

  const user = await getUserByEmail(email);
  if (user) {
    // Generate a unique token for password reset
    const passwordResetToken = uuidv4();

    // Set the token to emailResetPassword field in the user document
    const updateTokenInDB = await updateResetPasswordToken(passwordResetToken, email)

    if(!updateTokenInDB) {
        return NextResponse.json({
            status: 400,
            body: 'Something went wrong! Please try after sometime.',
        })
    }
    // Send the password reset email with the token
    await sendPasswordResetEmail(email, passwordResetToken);

    return NextResponse.json({ status: 200, body: "A password reset link has been sent to your email." });
  } else {
    // Respond with a generic message whether or not the email was found
    // This is a security measure to prevent email enumeration
    return NextResponse.json({ status: 200, body: "If the email is associated with an account, a password reset link will be sent." });
  }
};