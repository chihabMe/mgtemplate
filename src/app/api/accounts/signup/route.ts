import { db } from "@/utils/db";
import { hashPassword } from "@/utils/passwords";
import { BAD_REQUEST, CREATED } from "http-status";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import * as z from "zod"

const schema = z.object({
    email: z.string().email(),
    password: z.string()
})
export async function POST(req: Request) {
    const body = await req.json()
    const valid = schema.safeParse(body)
    if (!valid.success) {
        return NextResponse.json({
            message: "invalid fields",
            errors: valid.error.formErrors.fieldErrors
        }, {
            status: BAD_REQUEST
        })
    }
    const { email, password } = valid.data
    if (!email || !password) return NextResponse.json({ message: "invalid fields" }, {
        status: BAD_REQUEST
    })
    const usedEmail = await db.user.findFirst({
        where: {
            email: email
        }
    })
    if (usedEmail) return NextResponse.json({
        message: "Invalid fields", errors: {
            email: "allready been used"
        }
    }, { status: BAD_REQUEST })

    const hash = await hashPassword(password)
    const user = await db.user.create({
        data: {
            email,
            password: hash,
            username: email
        },
        select: {
            email: true,
            id: true,
            username: true
        }

    })
    return NextResponse.json({ message: "registred!", user }, {
        status: CREATED
    })
}