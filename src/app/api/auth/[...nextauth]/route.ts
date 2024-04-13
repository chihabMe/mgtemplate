import { db } from "@/utils/db"
import { comparePassword } from "@/utils/passwords";
import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"
import CredentailProvider from "next-auth/providers/credentials"

declare module "next-auth" {
  interface JWT extends DefaultJWT {
    id?: string;
    role?: UserRole
    username?: string;
    email?: string
    image?: string | null

  }

  interface Session extends DefaultSession {
    user: {
      id?: string;
      role?: UserRole
      username?: string;
      email?: string
      image?: string | null
    };
  }

  // interface Default
  interface User {
    role: UserRole;
    id?: string;
    username?: string;
    email?: string
    image?: string | null
  }
}



export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3600 * 24 * 35,
  },
  pages: {
    newUser: "/accounts/signup",
    signIn: "/accounts/signin",
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
          username: user.username,
          role: user.role,
        }
      }

    }),
  ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }