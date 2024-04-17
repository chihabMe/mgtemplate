import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { TOO_MANY_REQUESTS } from "http-status";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(5, "5 s"),
});
const isProd = process.env.NODE_ENV == "production"
export default withAuth(async function middleware(req, event) {
    const path = req.nextUrl.pathname;
    const token = req.nextauth.token;
    const ip = req.ip ?? "127.0.0.1";
    const limiter = await ratelimit.limit(`mw_${ip}`)
    event.waitUntil(limiter.pending)
    const res = limiter.success ? NextResponse.next() : NextResponse.rewrite(new URL("/errors/blocked", req.url), {
        status: TOO_MANY_REQUESTS
    });
    res.headers.set("X-RateLimit-Limit", limiter.limit.toString())
    res.headers.set("X-RateLimit-Remaning", limiter.remaining.toString())
    res.headers.set("X-RateLimit-Reset", limiter.reset.toString())
    if (!limiter.success) {
        return res
    }
    const redirectUnVerifiedUser = token && token?.verified && path != "/auth/verify-email" && !path.startsWith("/api")
    if (isProd && redirectUnVerifiedUser)
        return NextResponse.redirect(new URL("/auth/verify-email", req.url))

    if (path.startsWith("/admin") && (!token || token.role !== UserRole.ADMIN)) {
        return NextResponse.rewrite(new URL("/errors/unauthorized", req.url));
    }

    return res
}, {
    callbacks: {
        // Ensure the user is authorized with the role "USER" for all pages
        authorized: ({ token }) => true
    }
});

// export const config = {
//     matcher: ["/admin"]
// }
