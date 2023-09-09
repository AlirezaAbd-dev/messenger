import { computersRouter } from "./computers";
import { router } from "../trpc";
import { signRouters } from "./sign";

export const appRouter = router({
  computers: computersRouter,
  sign: signRouters
});

export type AppRouter = typeof appRouter;
