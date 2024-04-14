import { JWT } from "next-auth/jwt";
// types/next-auth.d.ts

// Import the original types from next-auth
import { DefaultJWT, DefaultSession, DefaultUser, JWT, Session, User } from 'next-auth';
import { UserRole } from "@prisma/client";

// Extend the JWT interface to include custom claims if needed

// Extend the User interface to include additional properties if needed
interface CustomUser extends DefaultUser {
    // Add custom properties here
    id?: string;
    role?: UserRole
    username?: string;
    email?: string
    image?: string | null
}

// Override the default types of JWT and User provided by next-auth
declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        role?: UserRole
        username?: string;
        email?: string
        image?: string | null

    }

}
declare module 'next-auth' {
    interface User extends CustomUser { }
    interface Session {
        user: {
            id?: string;
            role?: UserRole
            username?: string;
            email?: string
            image?: string | null
        }
    }
}

