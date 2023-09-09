import { TRPCError } from '@trpc/server';
import { protectedProcedure, router } from '../trpc';
import { z } from 'zod';

export const contactRouters = router({
   getAllContacts: protectedProcedure.query(async ({ ctx }) => {
      const { email, newHeaders } = ctx.user;

      //   Check the existing of user in database
      const findUser = await ctx.prisma.users.findUnique({
         where: { email },
         include: { contacts: true },
      });

      if (!findUser) {
         throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'کاربر مورد نظر یافت نشد!',
         });
      }

      const contacts = findUser.contacts;

      return { contacts, headers: newHeaders };
   }),
   addContact: protectedProcedure
      .input(
         z.object({
            name: z.string({
               invalid_type_error:
                  'لطفا نام مخاطب را به صورت رشته وارد نمایید!',
               required_error: 'لطفا نام مخاطب را وارد نمایید!',
            }),
            email: z
               .string({
                  invalid_type_error:
                     'لطفا ایمیل مخاطب را به صورت رشته وارد نمایید!',
                  required_error: 'لطفا ایمیل مخاطب را وارد نمایید!',
               })
               .email({ message: 'لطفا از یک ایمیل معتبر استفاده نمایید!' }),
         }),
      )
      .mutation(async ({ ctx, input }) => {
         const { email, newHeaders } = ctx.user;

         //   Check the existing of user in database
         const findUser = await ctx.prisma.users.findUnique({
            where: { email },
            include: { contacts: true },
         });

         if (!findUser) {
            throw new TRPCError({
               code: 'NOT_FOUND',
               message: 'کاربر مورد نظر یافت نشد!',
            });
         }

         const findContact = await ctx.prisma.users.findUnique({
            where: { email: input.email },
            select: { id: true },
         });

         if (!findContact) {
            throw new TRPCError({
               code: 'NOT_FOUND',
               message: 'مخاطب مورد نظر یافت نشد!',
            });
         }

         const contactExists = findUser.contacts?.find(
            (contact) => contact.contactId === findContact.id,
         );

         if (contactExists) {
            throw new TRPCError({
               code: 'CONFLICT',
               message: 'این مخاطب در حال حاضر موجود است!',
            });
         }

         await ctx.prisma.users.update({
            where: { email },
            data: {
               contacts: {
                  create: { contactId: findContact.id, name: input.name },
               },
            },
         });

         return {
            message: 'مخاطب با موفقیت ساخته شد',
            headers: newHeaders,
         };
      }),
   editContact: protectedProcedure
      .input(
         z.object({
            id: z.string({
               invalid_type_error: 'لطفا ایدی را با فرمت درست وارد نمایید!',
               required_error: 'وارد کردن آیدی مخاطب اجباری است!',
            }),
            name: z.string({
               invalid_type_error: 'لطفا نام را با فرمت درست وارد نمایید!',
               required_error: 'وارد کردن نام مخاطب اجباری است!',
            }),
         }),
      )
      .mutation(async ({ ctx, input }) => {
         const { email, newHeaders } = ctx.user;

         //   Check the existing of user in database
         const findUser = await ctx.prisma.users.findUnique({
            where: { email },
            include: { contacts: true },
         });

         if (!findUser) {
            throw new TRPCError({
               code: 'NOT_FOUND',
               message: 'کاربر مورد نظر یافت نشد!',
            });
         }

         const findContact = await ctx.prisma.contacts.findUnique({
            where: {
               usersId_contactId: { contactId: input.id, usersId: findUser.id },
            },
         });

         if (!findContact) {
            throw new TRPCError({
               code: 'NOT_FOUND',
               message: 'مخاطب مورد نظر یافت نشد!',
            });
         }

         await ctx.prisma.contacts.update({
            where: {
               usersId_contactId: { contactId: input.id, usersId: findUser.id },
            },
            data: { name: input.name },
         });

         return { message: 'مخاطب با موفقیت ویرایش شد', headers: newHeaders };
      }),
});
