import { Conversations, Messages } from '@prisma/client';
import { LastConversationType } from './handlers/conversationHandlers';

export type ConversationWithAllMessagesType =
   | (Conversations & { messages: Messages[] | undefined })
   | null;

export interface ServerToClientEvents {
   'conversations:getAll': (conversations: LastConversationType[]) => void;
   'conversations:start': (myId: string) => void;
   'conversations:getAllMessages': (
      messages: ConversationWithAllMessagesType,
   ) => void;
   'auth-error': (err: string) => void;
   error: (err: string) => void;
}

export interface ClientToServerEvents {
   'conversations:getAll': () => void;
   'conversations:getAllMessages': (
      id: string,
      isSelectedFromContacts: boolean,
   ) => void;
}

export interface SocketData {}
