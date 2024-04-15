import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmailOnServer } from "./lib/queries";
import { compare } from "bcryptjs";


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
    callbacks: {
        authorized({request, auth}){
            const {pathname} = request.nextUrl
            if(pathname === "/dashboard") return !!auth
            return true
        }
    },
    pages: {
        signIn: '/login',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      }
})