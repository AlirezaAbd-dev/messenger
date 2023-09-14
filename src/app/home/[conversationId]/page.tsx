'use client';
import FooterSection from '@/components/conversation/FooterSection';
import Header from '@/components/conversation/Header';
import MainChatSection from '@/components/conversation/MainChatSection';
import { ConversationWithAllMessagesType } from '@/socket-server/socketTypes';
import useConversation from '@/zustand/conversationStore';
import useSocket from '@/zustand/socketStore';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ConversationChat = () => {
   const [selectedConversation, setSelectedConversation] =
      useState<ConversationWithAllMessagesType>();

   const socket = useSocket((state) => state.socket);
   const setConversationWithMessages = useConversation(
      (state) => state.setConversationWithMessages,
   );
   const getConversationById = useConversation(
      (state) => state.getConversationById,
   );

   const param = usePathname();
   const id = param.split('/home/')[1]!;

   const searchParams = useSearchParams();
   const isSelectedFromContacts = !!searchParams.get('contact');

   useEffect(() => {
      socket.on('conversations:start', () => {
         socket.emit(
            'conversations:getAllMessages',
            id,
            isSelectedFromContacts,
         );
         socket.on('conversations:getAllMessages', (conversation) => {
            setConversationWithMessages(conversation);
            setSelectedConversation(getConversationById(conversation?.id!));
         });
      });
   }, [
      id,
      isSelectedFromContacts,
      socket,
      setConversationWithMessages,
      getConversationById,
   ]);

   return (
      <section className='flex flex-col justify-between items-center col-span-3 h-full w-full'>
         {/* Header */}
         <Header
            name={selectedConversation?.name}
            lastSeen={selectedConversation?.updatedAt}
         />

         {/* Chat Section */}
         <MainChatSection />

         {/* Message Tools */}
         <FooterSection />
      </section>
   );
};

export default ConversationChat;
