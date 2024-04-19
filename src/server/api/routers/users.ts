import { sendVerificationEmail } from "@/lib/email";
import ValidationError from "@/lib/validation.error";
import { createUserSchema } from "@/schemas/auth.schema";
import { adminProtectedProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { generateVerificationToken } from "@/utils/auth";
import { hashPassword } from "@/utils/passwords";
import { getBaseUrl } from "@/utils/url";
import { TRPCError } from "@trpc/server";
import * as z from "zod"

export const usersRouter = createTRPCRouter({

    createUser: publicProcedure.input(createUserSchema).mutation(async ({ ctx, input }) => {
        const exists = await ctx.db.user.findFirst({
            where: {
                email: input.email
            }
        })
        if (exists) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                cause: new ValidationError({
                    fieldErrors: {
                        email: ["This email is allready being used"],
                        hi: ["hi"],
                    }

                }),
                message: "Invalid fields",

            })
        }
        const hash = await hashPassword(input.password)
        const user = await ctx.db.user.create({
            data: {
                email: input.email,
                password: hash,
                username: input.username,

            },
            select: {
                email: true,
                id: true,
                username: true

            }
        })
        const tokenString = generateVerificationToken()
        const token = await ctx.db.verificationToken.create({
            data: {
                userId: user.id,
                token: tokenString
            }
        })
        const verificationLink = `${getBaseUrl()}/auth/activate/${token.userId}:${token.token}`
        console.log(verificationLink)
        // await sendVerificationEmail({
        //     to: user.email,
        //     username: user.username,
        //     verificationLink
        // })
        return user
    }),
    deleteUser: adminProtectedProcedure.input(z.object({ userID: z.string() })).query(async ({ ctx, input }) => {
        await ctx.db.user.delete({
            where: {
                id: input.userID
            }
        })
        return {
            message: "deleted",
        }

    }),
    activateUser: publicProcedure.input(z.object({
        userId: z.string(),
        token: z.string()
    })).mutation(async ({ ctx, input }) => {
        const token = await ctx.db.verificationToken.findFirst({
            where: {
                userId: input.userId,
                token: input.token
            }
        })
        if (!token)
            return new TRPCError({
                code: "BAD_REQUEST",
                message: "invalid token"
            })
        await ctx.db.user.update({
            where: {
                id: input.userId
            },
            data: {
                active: true,
                verified: true
            }
        })
        return {
            message: "activated"
        }
    })
    ,
    getAllUsers: adminProtectedProcedure.query(async ({ ctx, input }) => {
        const users = await ctx.db.user.findMany()
        return {
            data: users
        }
    })

})