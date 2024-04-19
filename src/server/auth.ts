import { db } from "@/lib/prisma";
import { comparePassword } from "@/utils/passwords";
import { getServerSession, NextAuthOptions } from "next-auth";
import CredentailProvider from "next-auth/providers/credentials"
import * as z from "zod"
export const SigninSchema = z.object({ email: z.string().email(), password: z.string().min(6, "the password must contain 6 characters") })
export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 3600 * 24 * 35,
    },
    pages: {
        newUser: "/auth/signup",
        signIn: "/auth/signin",

    },
    callbacks: {
        jwt: async ({ user, token }) => {
            if (user) {
                const u = user as unknown as any
                return {
                    ...token,
                    id: u.id,
                    ...u
                }
            }
            return token
        },
        session: async ({ session, token }) => {
            return {
                ...session,
                user: { ...token }
            }
        },

    },

    providers: [
        CredentailProvider({
            name: "credentails",
            credentials: {
                email: { label: "Email", placeholder: "jhon@email.com", type: "email" },
                password: { label: "Password", placeholder: "password", type: "password" },
            },
            authorize: async function (credentials, req) {
                if (!credentials?.email || !credentials.password) return null;
                const user = await db.user.findFirst({
                    where: { email: credentials.email, verified: true, active: true }
                })


                if (!user) return null
                const valid = await comparePassword(credentials.password, user.password)

                if (!valid) return null
                return {
                    email: user.email,
                    id: user.id,
                    verified: user.verified,
                    active: user.active,
                    username: user.username,
                    role: user.role,
                }
            }

        }),
    ],
}
export const getServerAuthSession = () => getServerSession(authOptions)