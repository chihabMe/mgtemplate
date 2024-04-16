import { adminProtectedProcedure, createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import * as z from "zod"


export const usersRouter = createTRPCRouter({
    deleteAUser: adminProtectedProcedure.input(z.object({ userID: z.string() })).query(async ({ ctx, input }) => {
        const user = await ctx.db.user.delete({
            where: {
                id: input.userID
            }
        })
        return {
            message: "deleted",
            data: user
        }

    }),
    getAllUsers: adminProtectedProcedure.query(async ({ ctx, input }) => {
        const users = await ctx.db.user.findMany()
        return {
            data: users
        }
    })

})