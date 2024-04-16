import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmailOnServer } from "./lib/queries";
import { compare } from "bcryptjs";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Add logic to verify credentials here
                if (!credentials) return null
                const { email, password } = credentials
                // Fetch user and password hash from your database
                const user = await getUserByEmailOnServer(email)
                if (!user) {
                    throw new Error("User not found.")
                }
                const passwordCorrect = await compare(password, user?.password)
                if (user && passwordCorrect) {
                    return { id: user.id, fName: user.fName, lName: user.lName, email: user.email, avatarUrl: user.avatarUrl, }
                } else {
                    throw new Error('Invalid credentials')
                }
            },
        }),
    ],
    session: { strategy: "jwt", },
    cookies: {
        sessionToken: {
            name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
                domain: VERCEL_DEPLOYMENT
                    ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
                    : undefined,
                secure: VERCEL_DEPLOYMENT,
            },
        },
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user = {
                ...session.user,
                // @ts-expect-error
                id: token.sub,
                // @ts-expect-error
                username: token?.user?.username || token?.user?.gh_username,
            };
            return session;
        },
        // authorized({ request, auth }) {
        //     const { pathname } = request.nextUrl
        //     if (pathname === "/dashboard") return !!auth
        //     return true
        // }
    },
    pages: {
        signIn: '/login',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
})