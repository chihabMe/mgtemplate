/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/lib/prisma";
import ValidationError from "@/lib/validation.error";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
    const session = await getServerAuthSession();

    return {
        db,
        session,
        ...opts,
    };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        console.log("------------errror-------")
        console.log(error.cause?.message)
        console.log(error.cause instanceof ValidationError)
        console.log("------------errror-------")
        let finalErrors = null
        if (error.cause instanceof ZodError) {
            finalErrors = new ValidationError()
            const flaten = error.cause.flatten()
            finalErrors.fieldErrors = flaten.fieldErrors;
            finalErrors.formErrors = flaten.formErrors
        }
        finalErrors = error.cause
        return {
            ...shape,
            data: {
                ...shape.data,
                errors: {hello:"hi"}
            },
        };
    },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            // infers the `session` as non-nullable
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
});


export const adminProtectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    if (ctx.session.user.role != "ADMIN")
        throw new TRPCError({ code: "UNAUTHORIZED" });
    return next({
        ctx: {
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
});
