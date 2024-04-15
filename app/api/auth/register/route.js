import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { getUserByEmail, registerUser } from "@/lib/queries";

export async function POST(request) {
    try {
        const { fName, lName, email, password, updatesConsent } = await request.json();
        // YOU MAY WANT TO ADD SOME VALIDATION HERE

        const userExist = await getUserByEmail(email)

        if (!userExist) {
            // console.log({ fName, lName, email, password, updatesConsent });

            const hashedPassword = await hash(password, 10); //hashing the password
            
            const response = await registerUser(fName, lName, email, hashedPassword, updatesConsent)

            if (!response) {
                return NextResponse.json({
                    status: 400,
                    body: 'Error registering user',
                })
            }
            return NextResponse.json({ status: 200, body: "success" });
        }
        return NextResponse.json({
            status: 400,
            body: 'User with this email already exist!',
        })
    } catch (e) {
        console.log({ e });
        return NextResponse.json({
            status: 500,
            body: 'Something went wrong!',
        })
    }
}