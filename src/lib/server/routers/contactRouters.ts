import { protectedProcedure, router } from '../trpc';

export const contactRouters = router({
   getAllContacts: protectedProcedure.query(({ ctx }) => {
    ctx.user.newHeaders
      return '';
   }),
});
