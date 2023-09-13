'use client';

import ContactsPanel from './ContactsPanel';
import ConversationsPanel from './ConversationsPanel';
import useGetConversations from '@/hooks/useGetConversations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

enum TabsEnum {
   CONVERSATION = 'conversations',
   CONTACTS = 'CONTACTS',
}

const TabsSection = () => {
   //! This hook gets all conversations from socket server
   useGetConversations();

   return (
      <Tabs
         dir='rtl'
         defaultValue={TabsEnum.CONVERSATION}
         className='w-full'
      >
         <TabsList className='w-full grid grid-cols-2 bg-zinc-900 text-white'>
            <TabsTrigger
               value={TabsEnum.CONTACTS}
               className='text-yellow-500 data-[state=active]:bg-yellow-500'
            >
               مخاطبین
            </TabsTrigger>
            <TabsTrigger
               value={TabsEnum.CONVERSATION}
               className='text-yellow-500 data-[state=active]:bg-yellow-500'
            >
               مکالمات
            </TabsTrigger>
         </TabsList>
         <TabsContent value={TabsEnum.CONTACTS}>
            {/* Contacts Panel */}
            <ContactsPanel />
         </TabsContent>
         <TabsContent value={TabsEnum.CONVERSATION}>
            {/* Conversation Panel */}
            <ConversationsPanel />
         </TabsContent>
      </Tabs>
   );
};

export default TabsSection;
