import { auth } from "@/auth";
import Navbar from "@/components/dashboard/Navbar";
import { getUserByEmailOnServer } from "@/lib/queries";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

//to check opengraph images sample go to opengraph.xyz
export const metadata = {
    applicationName: "Wrapplet",
    keywords: [
        'newsletter',
        'newsletter builder',
        'newsletter builder tool',
    ],
    metadataBase: new URL('https://wrapplet.com'),
    title: "Wrapplet | Dashboard",
    description: "Build and grow your newsletter. Capture potential subs and more.",
    openGraph: {
        images: '/opengraph-image.jpeg',
    },
    twitter: {
        images: '/opengraph-image.jpeg',
    },
};

export default async function RootLayout({ children }) {
    const session = await auth()
    if (!session || !session.user) return redirect('/login')
    let user = null
    if (session) {
        user = await getUserByEmailOnServer(session?.user?.email)
    }

    return (
        <main className="lg:grid grid-cols-[220px_1fr] h-screen overflow-hidden">
            <div className="w-full border-r overflow-hidden">
                <Navbar session={session} user={user}/>
            </div>
            <div className="w-full h-full p-6 overflow-y-auto -mt-5 lg:mt-0 pb-20 lg:pb-0">
                {children}
            </div>
        </main>
    );
}
