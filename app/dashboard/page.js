'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    //use this to protect client page if not using middleware and also wrap the app with <SessionProvider/>
    const {data: session} = useSession()
    const router = useRouter()
    if(!session || !session.user) return router.push('/login')

  return (
    <div>page</div>
  )
}

export default page