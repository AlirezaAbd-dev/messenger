import { Conversations } from '@prisma/client';

export interface ServerToClientEvents {
   'conversations:getAll': (conversations: Conversations[]) => void;
   'conversations:start': () => void;
   'auth-error': (err: string) => void;
   error: (err: string) => void;
}

export interface ClientToServerEvents {
   'conversations:getAll': () => void;
}

export interface SocketData {}
