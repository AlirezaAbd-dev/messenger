import { create } from "zustand";

export interface Conversation {
  _id: string;
  name: string;
  lastMessage: string;
  lastMessageDate: string;
  avatar?: string;
}

interface ConversationStore {
  isLoading: boolean;
  error: string;
  setIsLoading: (loading: boolean) => void;
  setError: (err: string) => void;
  conversations: Conversation[];
  setConversation: (conversations: Conversation[]) => void;
}

const useConversation = create<ConversationStore>()((set) => ({
  isLoading: false,
  error: "",
  setError(err) {
    set({ error: err });
  },
  setIsLoading(loading) {
    set({ isLoading: loading });
  },
  conversations: [],
  setConversation(conversations) {
    set({ conversations });
  },
}));

export default useConversation;
