import { computersRouter } from "./computers";
import { router } from "../trpc";

export const appRouter = router({
  computers: computersRouter,
});

export type AppRouter = typeof appRouter;
