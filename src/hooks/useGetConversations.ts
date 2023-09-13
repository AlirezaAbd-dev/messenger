import socket from '@/socket';
import useConversation from '@/zustand/conversationStore';
import useOptionStore from '@/zustand/optionsStore';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

const useGetConversations = () => {
   const setMyId = useOptionStore((state) => state.setMyId);
   const [setConversation, setIsLoading] = useConversation(
      (state) => [state.setConversation, state.setIsLoading],
      shallow,
   );

   useEffect(() => {
      setIsLoading(true);
      socket.on('conversations:start', (myId) => {
         setMyId(myId);
         socket.emitWithAck('conversations:getAll').catch((_err) => {
            socket.timeout(2000).emit('conversations:getAll');
         });
         socket.on('conversations:getAll', (conversations) => {
            setConversation(conversations);
            setIsLoading(false);
         });
      });
   }, [setIsLoading, setConversation, setMyId]);
};

export default useGetConversations;
