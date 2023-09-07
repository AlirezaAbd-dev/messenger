import { publicProcedure, router } from "../trpc";
export const computersRouter = router({
  getComputers: publicProcedure.query(async () => {
    return [{ id: 1, name: "Macintosh" }, { id: 2, name: "Microsoft" }];
  }),
});
