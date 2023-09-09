import { Socket } from 'socket.io';
import { io } from './server';
import {
   ClientToServerEvents,
   ServerToClientEvents,
   SocketData,
} from './socketTypes';

export type Io = typeof io;
export type ConnectedSocket = Socket<
   ClientToServerEvents,
   ServerToClientEvents,
   any,
   SocketData
>;
