import { STATUS } from '@prisma/client';
import verifyTokens from '../helpers/verifyToken';
import { prismaClient } from '../server';
import { ConnectedSocket, Io } from '../types';

const loginHandler = async (
   io: Io,
   socket: ConnectedSocket,
   selfId: string,
   onlineUsers: string[],
) => {
   let myEmail: string = '';
   let findUser;

   await verifyTokens(socket.handshake.headers, (err, email) => {
      if (err) {
         return socket.in(selfId).emit('auth-error', err);
      }
      if (email) {
         myEmail = email;
      }
   });

   if (myEmail) {
      findUser = await prismaClient.users.findUnique({
         where: { email: myEmail },
         include: { Conversations: true },
      });
      if (!findUser) {
         io.to(selfId).emit('auth-error', 'شما اجازه دسترسی ندارید!');
         return;
      }
      socket.join(findUser.id);
      // If user's status isn't OFF put it in onlineUsers array
      if (findUser?.status !== 'OFF') {
         onlineUsers.push(findUser?.id);
         findUser.status = STATUS.ONLINE;
      }
      if (findUser.Conversations.length > 0) {
         findUser.Conversations.forEach((c) => {
            socket.join(c.id);
         });
      }
   }

   socket.emit('conversations:start');

   return { findUser, myEmail };
};

export default loginHandler;
