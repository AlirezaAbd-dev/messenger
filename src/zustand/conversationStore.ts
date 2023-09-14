import { LastConversationType } from '@/socket-server/handlers/conversationHandlers';
import { ConversationWithAllMessagesType } from '@/socket-server/socketTypes';
import { create } from 'zustand';

export interface Conversation {
   id: string;
   name: string;
   lastMessage: string;
   lastMessageDate: string;
   avatar: string | null;
}

interface ConversationStore {
   isLoading: boolean;
   error: string;
   setIsLoading: (loading: boolean) => void;
   setError: (err: string) => void;
   conversations: LastConversationType[];
   setConversation: (conversations: LastConversationType[]) => void;

   conversationsWithMessages: ConversationWithAllMessagesType[];
   setConversationWithMessages: (
      conevrsationWithMessages: ConversationWithAllMessagesType,
   ) => void;
   getConversationById: (
      id: string,
   ) => ConversationWithAllMessagesType | undefined;
}

const useConversation = create<ConversationStore>()((set, get) => ({
   isLoading: false,
   error: '',
   setError(err) {
      set({ error: err });
   },
   setIsLoading(loading) {
      set({ isLoading: loading });
   },
   // --------------------------------------
   conversations: [],
   setConversation(conversations) {
      set({ conversations });
   },
   //---------------------------------------
   conversationsWithMessages: [],
   setConversationWithMessages(conversationWithMessages) {
      if (conversationWithMessages == null) {
         return;
      }
      const conversations = get().conversationsWithMessages;
      const conversationIndex = conversations.findIndex(
         (c) => c?.id === conversationWithMessages?.id,
      );
      if (conversationIndex !== -1) {
         conversations[conversationIndex] = conversationWithMessages;
      } else {
         conversations.push(conversationWithMessages);
      }
      set({ conversationsWithMessages: conversations });
   },
   getConversationById: (id) => {
      console.log(get().conversationsWithMessages);
      const foundConversation = get().conversationsWithMessages.find(
         (c) => c?.id === id,
      );
      return foundConversation;
   },
}));

export default useConversation;
