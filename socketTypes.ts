import { Conversation } from "./socket-server/models/ConversationModel";

export interface ServerToClientEvents {
  "conversations:getAll": (conversations: Conversation[]) => void;
  "conversations:start": () => void;
  "auth-error": (err: string) => void;
  error: (err: string) => void;
}

export interface ClientToServerEvents {
  "conversations:getAll": () => void;
}

export interface SocketData {}
