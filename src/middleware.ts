import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(5, "5 s"),
});

export default withAuth(async function middleware(req, event) {
    const path = req.nextUrl.pathname;
    const token = req.nextauth.token;
    const ip = req.ip ?? "127.0.0.1";
    const limiter = await ratelimit.limit(`mw_${ip}`)
    event.waitUntil(limiter.pending)
    const res = NextResponse.next(req)
    res.headers.set("X-RateLimit-Limit",limiter.limit.toString())
    res.headers.set("X-RateLimit-Remaning",limiter.remaining.toString())
    res.headers.set("X-RateLimit-Reset",limiter.reset.toString())
    if (!limiter.success)
        return NextResponse.rewrite(new URL("/errors/blocked", req.url))
    // Ensure the user is authenticated
    // if (!token) {
    //     return NextResponse.redirect(new URL("/auth/signin", req.nextUrl.basePath));
    // }

    // Check if the user has the required role for accessing admin pages
    if (!path.startsWith("/admin") && (!token || token.role !== UserRole.ADMIN)) {
        return NextResponse.redirect(new URL("/errors/unauthorized", req.url));
    }
}, {
    callbacks: {
        // Ensure the user is authorized with the role "USER" for all pages
        authorized: ({ token }) => true
    }
});

// export const config = {
//     matcher: ["/admin"]
// }