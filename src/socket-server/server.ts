import { createServer } from 'http';

import express from 'express';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

config({ path: '../../.env' });
import './env';

import {
   ClientToServerEvents,
   ServerToClientEvents,
   SocketData,
} from './socketTypes';
import redisClient from './config/redisClient';
import checkTokensMiddleware from './middlewares/ckeckTokensMiddleware';
import loginHandler from './handlers/loginHandler';
import defaultHandlers from './handlers/defaultHandlers';

import conversationHandlers from './handlers/conversationHandlers';

const app = express();
const server = createServer(app);
export const io = new Server<
   ClientToServerEvents,
   ServerToClientEvents,
   any,
   SocketData
>(server, {
   cors: { origin: 'http://localhost:3000' },
});

export const prismaClient = new PrismaClient();

(async () => {
   await redisClient.connect();

   server.listen(3001, () => {
      console.log('server socket is running on port 3001.');
   });

   let onlineUsers: string[] = [];

   // Authorization middleware
   checkTokensMiddleware(io);

   //? Events
   io.on('connection', async (socket) => {
      console.log(`connected with userId: ${socket.id}`);
      const selfId = socket.id;

      const { findUser, myEmail } = await loginHandler(
         io,
         socket,
         selfId,
         onlineUsers,
      ).then((res) => ({
         findUser: res?.findUser,
         myEmail: res?.myEmail as string,
      }));

      // Conversation events
      await conversationHandlers(io, socket, myEmail);

      // Default events like "error" or "disconnect"
      await defaultHandlers(socket, findUser, selfId, onlineUsers);
   });
})();
