import { publicProcedure, router } from '../trpc';
export const computersRouter = router({
   getComputers: publicProcedure.query(async ({ ctx }) => {
      // await ctx.prisma.users.create({
      //    data: {
      //       name: 'Alireza',
      //       email: 'alireza.abedi9310@gmail.com',
      //       bio: "I'm just a fullstack developer",
      //       username: 'AlirezaAbd-dev',
      //    },
      // });

      const users = await ctx.prisma.users.findMany();

      return users;
   }),
});
