import { BAD_REQUEST, CREATED } from "http-status";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import * as z from "zod"

const schema = z.object({
    email: z.string().email(),
    password: z.string()
})
export async function POST(req: NextApiRequest) {
    const valid = schema.safeParse(req.body)
    if (!valid.success) {
        return NextResponse.json({
            message: "invalid fields",
            errors: valid.error.formErrors.fieldErrors
        }, {
            status: BAD_REQUEST
        })
    }
    const { email, password } = req.body
    if (!email || !password) return NextResponse.json({ message: "invalid fields" }, {
        status: BAD_REQUEST
    })
    console.log(email)
    console.log(password)
    return NextResponse.json({ message: "registred!" }, {
        status: CREATED
    })
}