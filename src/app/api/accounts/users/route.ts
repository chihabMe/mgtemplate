import { db } from "@/lib/prisma";
import { authOptions } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { UNAUTHORIZED } from "http-status";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role != UserRole.ADMIN)
        return NextResponse.json({ error: "unable to access this data" }, {
            status: UNAUTHORIZED
        })
    const users = await db.user.findMany({
        take: 10
    })
    return NextResponse.json(users)
}