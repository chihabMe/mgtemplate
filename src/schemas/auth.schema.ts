
import * as z from "zod"
export const createUserSchema = z.object({
    email: z.string().email(),
    username: z.string().min(4).max(20),
    password: z.string().min(6, "the password must contain 6 characters").max(30,"the password must be less then 30 characters") ,
    password2: z.string().min(6),

}).refine((data) => data.password == data.password2, {
    message: "Passwords don't match",
    path: ["password2"]
})

export const signinSchema = z.object({ email: z.string().email(), password: z.string().min(6, "the password must contain 6 characters") })