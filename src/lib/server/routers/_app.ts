import { router } from '../trpc';
import { contactRouters } from './contactRouters';
import { signRouters } from './sign';

export const appRouter = router({
   sign: signRouters,
   contact: contactRouters
});

export type AppRouter = typeof appRouter;
