import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {
    const session = await auth()
    console.log({session});
    if(!session || !session.user) return redirect('/login')
  return (
    <main>Server protected page</main>
  )
}

export default page