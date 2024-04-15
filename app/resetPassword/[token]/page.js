import { getUserByResetPasswordToken } from '@/lib/queries'
// import GlobalAPI from '@/services/GlobalAPI'
import React from 'react'
import FormPage from './form'

const page = async ({ params }) => {
    let isValidUser
    try {
        const user = await getUserByResetPasswordToken(params.token)
        if (user.length !== 0) {
            const tokenExpiryTime = new Date(user[0].passwordResetTokenExpires)
            const currentTime = new Date()
            const isTokenExpired = tokenExpiryTime <= currentTime;
            console.log({ isTokenExpired });
            if (!isTokenExpired) {
                isValidUser = user
            } else {
                isValidUser = null
            }
        } else {
            isValidUser = null
        }
    } catch (error) {
        console.log('[error]', error);
        isValidUser = null
    }

    if (isValidUser) {
        return (
            <main className="h-screen flex items-center justify-center">
                <div className="flex h-full justify-center items-center w-full md:w-1/2">
                    <FormPage token={params.token}/>
                </div>
            </main>
        )
    }
    return (
        <main className="h-screen flex items-center justify-center">
            <div className="flex h-full justify-center items-center w-full md:w-1/2">
                Not valid user
            </div>
        </main>
    )
}

export default page

