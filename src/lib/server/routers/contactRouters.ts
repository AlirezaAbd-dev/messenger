import { TRPCError } from '@trpc/server';
import { protectedProcedure, router } from '../trpc';
import contactsValidation from '../validation/contactsValidation';

export const contactRouters = router({
   getAllContacts: protectedProcedure.query(async ({ ctx }) => {
      const { email, newHeaders } = ctx.user;

      //   Check the existing of user in database
      const findUser = await ctx.prisma.users.findUnique({
         where: { email },
         select: { id: true },
      });

      if (!findUser) {
         throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'کاربر مورد نظر یافت نشد!',
         });
      }

      const contacts = await ctx.prisma.contacts.findMany({
         where: { usersId: findUser.id },
         include: {
            contact: { select: { email: true, id: true, avatar: true } },
         },
         orderBy: { name: 'asc' },
      });

      return { contacts, headers: newHeaders };
   }),
   addContact: protectedProcedure
      .input(contactsValidation.addContact)
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
      .input(contactsValidation.editContact)
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
   deleteContact: protectedProcedure
      .input(contactsValidation.deleteContact)
      .mutation(async ({ ctx, input }) => {
         const { email, newHeaders } = ctx.user;

         //   Check the existing of user in database
         const findUser = await ctx.prisma.users.findUnique({
            where: { email },
         });

         if (!findUser) {
            throw new TRPCError({
               code: 'NOT_FOUND',
               message: 'کاربر مورد نظر یافت نشد!',
            });
         }

         await ctx.prisma.contacts.delete({
            where: {
               usersId_contactId: { contactId: input.id, usersId: findUser.id },
            },
         });

         return {
            message: 'مخاطب با موفقیت حذف شد!',
            headers: newHeaders,
         };
      }),
});
