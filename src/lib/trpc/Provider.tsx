'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import React, { useState } from 'react';

import { trpc } from './client';
import { getUrl } from './utils';
import SuperJSON from 'superjson';

export default function TrpcProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const [queryClient] = useState(() => new QueryClient({}));
   const [trpcClient] = useState(() =>
      trpc.createClient({
         transformer: SuperJSON,
         links: [
            loggerLink({
               enabled: (opts) =>
                  (process.env.NODE_ENV === 'development' &&
                     typeof window !== 'undefined') ||
                  (opts.direction === 'down' && opts.result instanceof Error),
            }),
            httpBatchLink({
               url: getUrl(),
               headers: (_op) => {
                  return {
                     'x-auth-token':
                        (localStorage &&
                           (localStorage?.getItem('verify-token') as
                              | string
                              | undefined)) ||
                        '',
                     'x-refresh-token':
                        (localStorage &&
                           (localStorage?.getItem('refresh-token') as
                              | string
                              | undefined)) ||
                        '',
                  };
               },
            }),
         ],
      }),
   );

   return (
      <trpc.Provider
         client={trpcClient}
         queryClient={queryClient}
      >
         <QueryClientProvider client={queryClient}>
            {children}
         </QueryClientProvider>
      </trpc.Provider>
   );
}
