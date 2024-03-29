import { cookies } from 'next/headers';
import { appRouter } from '../server/routers/_app';
import { loggerLink } from '@trpc/client';
import { experimental_createTRPCNextAppDirServer as createTRPCNextAppDirServer } from '@trpc/next/app-dir/server';
import { experimental_nextCacheLink as nextCacheLink } from '@trpc/next/app-dir/links/nextCache';
import SuperJSON from 'superjson';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({ log: ['query', 'error'] });

/**
 * This client invokes procedures directly on the server without fetching over HTTP.
 */
export const api = createTRPCNextAppDirServer<typeof appRouter>({
   config() {
      return {
         transformer: SuperJSON,
         links: [
            loggerLink({
               enabled: (_op) => true,
            }),
            nextCacheLink({
               revalidate: 1,
               router: appRouter,
               async createContext() {
                  //  const { session } = await getUserAuth();
                  return {
                     //  session,
                     prisma: prismaClient,
                     headers: {
                        cookie: cookies().toString(),
                        'x-trpc-source': 'rsc-invoke',
                     },
                  };
               },
            }),
         ],
      };
   },
});
