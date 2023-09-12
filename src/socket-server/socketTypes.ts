import { Conversations } from '@prisma/client';
import { LastConversationType } from './handlers/conversationHandlers';

export interface ServerToClientEvents {
   'conversations:getAll': (conversations: LastConversationType[]) => void;
   'conversations:start': () => void;
   'auth-error': (err: string) => void;
   error: (err: string) => void;
}

export interface ClientToServerEvents {
   'conversations:getAll': () => void;
}

export interface SocketData {}
