export interface ServerToClientEvents {
  "auth-error": (err: string) => void;
  error: (err: string) => void;
}

export interface ClientToServerEvents {}

export interface SocketData {}