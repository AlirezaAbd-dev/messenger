import { Conversations } from '@prisma/client';
import { LastConversationType } from './handlers/conversationHandlers';

export interface ServerToClientEvents {
   'conversations:getAll': (conversations: LastConversationType[]) => void;
   'conversations:start': (myId: string) => void;
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
