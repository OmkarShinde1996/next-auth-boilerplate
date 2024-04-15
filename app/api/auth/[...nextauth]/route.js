import { handlers } from "@/auth";

export const {GET, POST} = handlers;


// import { getUserByEmailOnServer } from '@/lib/queries';
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import { compare } from "bcrypt";

// const handler = NextAuth({
//     session: {
//         strategy: 'jwt',
//         maxAge: 1 * 24 * 60 * 60, // 1 day
//     },
//     pages: {
//         signIn: '/login', // Custom login page
//     },
//     // Providers array will be configured in the next steps
//     providers: [
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 email: {},
//                 password: {},
//             },
//             async authorize(credentials) {
//                 // Add logic to verify credentials here
//                 if (!credentials) return null
//                 const { email, password } = credentials
//                 // Fetch user and password hash from your database
//                 const user = await getUserByEmailOnServer(email)
//                 console.log('[user.password]', user.password);
//                 const passwordCorrect = await compare(
//                     password, user.password
//                 );

//                 if (user && passwordCorrect) {
//                     return { id: user.id, fName: user.fName, lName: user.lName, email: user.email, avatarUrl: user.avatarUrl, }
//                 } else {
//                     throw new Error('Invalid credentials')
//                 }
//             },
//         }),
//     ],

//     // Additional configuration will be added here
//     callbacks: {
//         async session({ session, user }) {
//             session.user = user
//             return session
//         },
//     }
// });

// export { handler as GET, handler as POST };