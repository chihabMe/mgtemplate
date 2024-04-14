import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

export default withAuth(async function middleware(req) {
    const path = req.nextUrl.pathname;
    const token = req.nextauth.token;
    console.log("pass----------")
    // Ensure the user is authenticated
    if (!token) {
        return NextResponse.redirect(new URL("/auth/signin", req.nextUrl.basePath));
    }

    return NextResponse.redirect(new URL("/errors/unauthorized", req.url));
    // Check if the user has the required role for accessing admin pages
    // if (path.startsWith("/admin") && token.role !== UserRole.ADMIN) {
    //     return NextResponse.redirect(new URL("/errors/unauthorized", req.url));
    // }
}, {
    callbacks: {
        // Ensure the user is authorized with the role "USER" for all pages
        authorized: ({ token }) => token?.role === UserRole.USER
    }
});

export const config = {
    matcher: ["/admin"]
}