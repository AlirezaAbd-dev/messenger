import { io, Socket } from 'socket.io-client';
import {
   ClientToServerEvents,
   ServerToClientEvents,
} from './socket-server/socketTypes';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
   'http://localhost:3001',
   {
      extraHeaders: {
         'x-auth-token': localStorage?.getItem('verify-token')!,
         'x-refresh-token': localStorage?.getItem('refresh-token')!,
      },
      autoConnect: true,
   },
);

export default socket;
