export interface ServerToClientEvents {
  alert: (text: string) => void;
}

export interface ClientToServerEvents {}

export interface SocketData {
  verifyToken: string;
  refreshToken: string;
}
