'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'


const LoginLogoutButton = ({ session, user }) => {
    console.log({session});
    console.log({user});
    if (session && session.user) {
        return (
            <div className='text-center'>
                Signed in as {session.user.email} - {`${user.fName} ${user.lName}`} <br />
                <div className='flex gap-2 justify-center items-center'>
                    <Button variant='outline' size='sm' className='text-sm' onClick={() => signOut()}>Sign out</Button>
                    <Link href={'/dashboard'} className="px-5 text-xs py-2 rounded-md bg-primary">Dashboard</Link>
                </div>
            </div>
        )
    }
    return (
        <div className='flex gap-2 justify-center items-center'>
            <Link href={`/login`} className="px-5 text-xs py-2 rounded-md bg-primary">Login</Link>
            <Link href={`/register`} className="px-5 text-xs py-2 rounded-md bg-primary">Register</Link>
            <Link href={`/resetPassword`} className="px-5 text-xs py-2 rounded-md bg-primary">Reset Password</Link>
        </div>
    )
}

export default LoginLogoutButton