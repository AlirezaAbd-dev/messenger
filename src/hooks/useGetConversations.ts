import socket from '@/socket';
import useConversation from '@/zustand/conversationStore';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

const useGetConversations = () => {
   const [setConversation, setIsLoading] = useConversation(
      (state) => [state.setConversation, state.setIsLoading],
      shallow,
   );

   useEffect(() => {
      setIsLoading(true);
      socket.on('conversations:start', () => {
         socket.emitWithAck('conversations:getAll').catch((_err) => {
            socket.timeout(2000).emit('conversations:getAll');
         });
         socket.on('conversations:getAll', (conversations) => {
            const allConversations = conversations.map((c) => ({
               id: c.id,
               lastMessage:
                  c?.messages?.length > 0
                     ? c.messages[c.messages.length - 1]?.content!
                     : '',
               name: c.name,
               lastMessageDate: new Date(c.updatedAt).toLocaleTimeString('fa'),
               avatar: c.avatar,
            }));

            setConversation(allConversations);
            setIsLoading(false);
         });
      });
   }, [setIsLoading, setConversation]);
};

export default useGetConversations;
