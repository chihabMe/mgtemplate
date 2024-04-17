import { adminProtectedProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { hashPassword } from "@/utils/passwords";
import { TRPCError } from "@trpc/server";
import * as z from "zod"


export const usersRouter = createTRPCRouter({

    createUser: publicProcedure.input(z.object({
        email: z.string().email(),
        username: z.string().min(4).max(20),
        password: z.string(),
        password2: z.string(),
    }).refine((data) => data.password == data.password2, {
        message: "Passwords don't match",
        path: ["password2"]
    }
    )).mutation(async ({ ctx, input }) => {
        const exists = await ctx.db.user.findFirst({
            where: {
                email: input.email
            }
        })
        if (exists) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                cause: {
                    email: ["this email is been used"],
                },
                message: "Invalid fields"

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
    getAllUsers: adminProtectedProcedure.query(async ({ ctx, input }) => {
        const users = await ctx.db.user.findMany()
        return {
            data: users
        }
    })

})