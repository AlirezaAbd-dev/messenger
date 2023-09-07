import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from '../trpc/context';
import superjson from 'superjson';
import { ZodError } from 'zod';

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
   transformer: superjson,
   errorFormatter(opts) {
      const { shape, error } = opts;
      return {
         ...shape,
         data: {
            ...shape.data,
            zodError:
               error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
                  ? error.cause.flatten()
                  : null,
         },
      };
   },
});

/**
 * * NOTE: Export reusable router and procedure helpers
 * * NOTE: that can be used throughout the router
 */

const protectMiddleware = t.middleware(({ ctx, next }) => {
   console.log(ctx.headers);
   return next();
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcidure = t.procedure.use(protectMiddleware);
