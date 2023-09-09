import { z } from 'zod';

import cache from '@/lib/config/nodeCache';
import transport from '@/lib/config/mailTransport';
import { TRPCError } from '@trpc/server';
import createToken from '@/lib/helpers/createToken';
import { publicProcedure, router } from '../trpc';

export const signRouters = router({
   sendOTP: publicProcedure
      .input(
         z.object({
            email: z
               .string({
                  required_error: 'لطفا ایمیل خود را وارد نمایید!',
                  invalid_type_error: 'لطفا یک رشته ی متنی ارسال نمایید!',
               })
               .email({ message: 'لطفا از یک ایمیل معتبر استفاده نمایید!' }),
         }),
      )
      .mutation(async ({ input }) => {
         const { email } = input;

         // Making a random number for sending to user
         const randomNumber = Math.floor(100000 + Math.random() * 900000);

         // set the random number into cache
         cache.set(email, randomNumber, 600);
         const cachedEmail = await cache.get<Promise<string>>(email);

         try {
            // sending email to user
            const emailResponse = await transport.sendMail({
               from: process.env.NODEMAILER_USER,
               to: email,
               subject: 'کد یکبار مصرف پیامرسان',
               text: `کد یکبار مصرف: 
               ${randomNumber}
               لطفا این کد را در اختیار دیگران قرار ندهید.
               `,
            });

            if (emailResponse.accepted) {
               return { message: 'ایمیل با موفقیت ارسال شد' };
            }
         } catch (err) {
            console.log(err);
            throw new TRPCError({
               code: 'INTERNAL_SERVER_ERROR',
               message: 'مشکلی در سرور پیش آمد!',
            });
         }
      }),
   signIn: publicProcedure
      .input(
         z.object({
            email: z
               .string({
                  required_error: 'لطفا ایمیل خود را وارد نمایید!',
                  invalid_type_error: 'لطفا یک رشته ی متنی ارسال نمایید!',
               })
               .email({ message: 'لطفا از یک ایمیل معتبر استفاده نمایید!' }),
            OTP: z.number({
               required_error: 'فیلد کد یکبار مصرف را باید پر کنید!',
            }),
         }),
      )
      .mutation(async ({ ctx, input }) => {
         const { OTP, email } = input;

         let cachedData;
         try {
            cachedData = <string | undefined>await cache.get(email);
         } catch (err) {
            throw new TRPCError({
               code: 'INTERNAL_SERVER_ERROR',
               message: 'مشکلی در سرور پیش آمد!',
               cause: (err as { message: string }).message,
            });
         }

         if (!cachedData) {
            throw new TRPCError({
               code: 'BAD_REQUEST',
               message: 'رمز یکبار مصرف اشتباه است!',
            });
         }

         if (OTP !== Number(cachedData)) {
            throw new TRPCError({
               code: 'BAD_REQUEST',
               message: 'رمز یکبار مصرف اشتباه است!',
            });
         }

         try {
            cache.del(email);
         } catch (err) {
            throw new TRPCError({
               code: 'INTERNAL_SERVER_ERROR',
               message: 'مشکلی در سرور پیش آمد!',
            });
         }

         try {
            const findUser = await ctx.prisma.users.findUnique({
               where: {
                  email,
               },
            });

            if (findUser) {
               const { verifyToken, refreshToken } = await createToken(
                  findUser.email,
               );

               return {
                  message: 'با موفقیت وارد حساب خود شدید',
                  headers: {
                     'x-auth-token': verifyToken,
                     'x-refresh-token': refreshToken,
                  } as const,
               };
            }
         } catch (err) {
            throw new TRPCError({
               code: 'INTERNAL_SERVER_ERROR',
               message: (err as { message: string }).message,
               cause: err,
            });
         }

         await ctx.prisma.users
            .create({
               data: {
                  email,
                  name: 'Unknown',
               },
            })
            .then(async (res) => {
               const { verifyToken, refreshToken } = await createToken(
                  res.email,
               );

               return {
                  message: 'با موفقیت وارد حساب خود شدید',
                  headers: {
                     'x-auth-token': verifyToken,
                     'x-refresh-token': refreshToken,
                  },
               };
            })
            .catch(() => {
               throw new TRPCError({
                  code: 'INTERNAL_SERVER_ERROR',
                  message: 'مشکلی در سرور پیش آمد!',
               });
            });
      }),
});
