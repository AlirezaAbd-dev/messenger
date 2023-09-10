'use client';
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';
import useContactsStore from '@/zustand/contactsStore';
import TabsSection from './TabsSection';
import useAuthorization from '@/hooks/useAuthorization';
import { trpc } from '@/lib/trpc/client';
import { shallow } from 'zustand/shallow';

const MainSidebar = () => {
   // Authorization
   useAuthorization();
   const [setLoading, setError] = useContactsStore(
      (state) => [state.setLoading, state.setError],
      shallow,
   );
   const { isLoading, isError, error } = trpc.contact.getAllContacts.useQuery();

   const [isInSlug, setIsInSlug] = useState<boolean>(false);
   const pathname = usePathname();

   useEffect(() => {
      if (isLoading) {
         setLoading(true);
      }
      if (!isLoading) {
         setLoading(false);
      }
   }, [isLoading, setLoading]);

   useEffect(() => {
      if (isError) {
         setError(error.message);
      }
      if (!isError) {
         setError('');
      }
   }, [isError, setError, error?.message]);

   useEffect(() => {
      if (pathname.split('/')[2]) {
         setIsInSlug(true);
      } else {
         setIsInSlug(false);
      }
   }, [pathname]);

   return (
      <section
         className={`${
            isInSlug && 'hidden'
         } col-span-4 h-full overflow-y-auto pb-16 md:col-span-1 md:block md:border-l md:border-zinc-700 `}
      >
         <TabsSection />
      </section>
   );
};

export default MainSidebar;
