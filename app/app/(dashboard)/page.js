'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const page = () => {
    //use this to protect client page if not using middleware and also wrap the app with <SessionProvider/>
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (status === 'loading') {
            // Session data is still loading, do not redirect
            return;
        }
        if (!session || !session.user) {
            // User is not authenticated, redirect to login page
            router.push('/login');
        } else {
            // User is authenticated, set loading state to false
            setIsLoading(false);
        }
    }, [session, status, router]);

    if (isLoading) {
        return <main>Loading...</main>;
    }

    return <main>Dashboard page</main>;
};

export default page