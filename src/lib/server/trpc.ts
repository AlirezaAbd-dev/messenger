import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import * as jwt from 'jsonwebtoken';

import { Context } from '../trpc/context';
import redisClient from '../config/redisClient';

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

const protectMiddleware = t.middleware(async ({ ctx, next }) => {
   if (!ctx.headers?.['x-auth-token'] || !ctx.headers?.['x-refresh-token']) {
      throw new TRPCError({
         code: 'UNAUTHORIZED',
         message: 'شما اجازه دسترسی به این بخش را ندارید!',
      });
   }

   const unverifiedToken = ctx.headers?.['x-auth-token']!.startsWith('Bearer')
      ? ctx.headers['x-auth-token']!.split(' ')[1]
      : '';

   const unverifiedRefreshToken = ctx.headers?.['x-refresh-token']!.startsWith(
      'Bearer',
   )
      ? ctx.headers['x-refresh-token']!.split(' ')[1]
      : '';

   if (!unverifiedToken || !unverifiedRefreshToken) {
      throw new TRPCError({
         code: 'UNAUTHORIZED',
         message: 'شما اجازه دسترسی به این بخش را ندارید!',
      });
   }

   let newToken = '';

   let refreshToken;
   let verifyToken;

   try {
      // Verify the token
      verifyToken = jwt.verify(unverifiedToken, process.env.JWT_VERIFY_SECRET);
   } catch (_err) {
      // Process the refresh token if verify token is not valid
      try {
         refreshToken = jwt.verify(
            unverifiedRefreshToken,
            process.env.JWT_REFRESH_SECRET,
         );
      } catch (err) {
         throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'شما اجازه دسترسی به این بخش را ندارید!',
         });
      }

      // Check if there is the same token in redis or what?
      let redisMembers;
      try {
         await redisClient.connect();
         redisMembers = await redisClient.sIsMember(
            process.env.REDIS_TOKEN_KEY,
            unverifiedRefreshToken,
         );
         await redisClient.disconnect();
      } catch (err) {
         throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'خطایی در سرور رخ داد!',
         });
      }

      if (!redisMembers) {
         throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'شما اجازه دسترسی ندارید!',
         });
      }

      // Making a new token if the check above was true
      newToken = jwt.sign(
         { email: (refreshToken as jwt.JwtPayload).email },
         process.env.JWT_VERIFY_SECRET,
         {
            expiresIn: '15m',
         },
      );
   }

   const newHeaders = { 'x-auth-token': newToken ? newToken : '' };

   return next({
      ctx: {
         user: {
            email: verifyToken
               ? (verifyToken as unknown as jwt.JwtPayload & { email: string })
                    .email
               : (refreshToken as unknown as jwt.JwtPayload & { email: string })
                    .email,
            newHeaders,
         },
      },
   });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(protectMiddleware);
