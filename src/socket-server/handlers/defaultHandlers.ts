import { STATUS, Users } from '@prisma/client';
import { ConnectedSocket } from '../types';
import { prismaClient } from '../server';

const defaultHandlers = async (
   socket: ConnectedSocket,
   findUser: Users | undefined,
   selfId: string,
   onlineUsers: string[],
) => {
   // Error handling
   socket.on('error', (err) => {
      socket.to(selfId).emit('error', err.message);
   });

   // When user disconnected
   socket.on('disconnect', async () => {
      if (findUser) {
         onlineUsers = onlineUsers.filter((u) => u !== findUser?.id);
         if (findUser.status !== 'OFF') {
            await prismaClient.users.update({
               where: { id: findUser.id },
               data: { status: STATUS.OFFLINE },
            });
         }
      }
   });
};

export default defaultHandlers;
