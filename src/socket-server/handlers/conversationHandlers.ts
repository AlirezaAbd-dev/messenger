import {
   ConversationType,
   Conversations,
   Messages,
   Users,
} from '@prisma/client';
import { prismaClient } from '../server';
import { ConnectedSocket, Io } from '../types';

export type LastConversationType = Conversations & {
   messages: Messages[];
   participants: Users[];
   type: ConversationType;
};

const conversationHandlers = async (
   io: Io,
   socket: ConnectedSocket,
   myEmail: string,
) => {
   // Event calls
   // Finding user in database
   socket.on('conversations:getAll', async () => {
      console.log('finding started!');
      const findUser = await prismaClient.users.findUnique({
         where: { email: myEmail },
         include: { contacts: true },
      });

      // Finding all conversations that has somthing to do with that user
      const conversations = await prismaClient.conversations.findMany({
         where: { participants: { every: { id: findUser?.id } } },
         include: { participants: true, messages: true },
      });

      console.log('conversations found');
      let lastConversations: LastConversationType[] = [];

      if (conversations.length > 0) {
         conversations.forEach(async (conversation, index) => {
            if (conversation.type === ConversationType.PRIVATE) {
               // Remove users object from participants
               const filteredParticipants = conversation.participants.filter(
                  (p) => p.id !== findUser?.id,
               );

               // Find the other participant's contact data if he/she is in the user's contacts list
               const filteredContact = findUser?.contacts.find(
                  (c) => c.id === filteredParticipants[0].id,
               );

               // If he/she is in contacts list then push it to the conversations list
               if (filteredContact) {
                  lastConversations.push({
                     id: conversation.id,
                     avatar: conversation.avatar,
                     createdAt: conversation.createdAt,
                     messages: conversation.messages,
                     participants: conversation.participants,
                     type: conversation.type,
                     updatedAt: conversation.updatedAt,
                     name: filteredContact.name,
                  });
               } else {
                  // If he/she isn't in contacts list then name him/her on default if has a name or "Unknown User"
                  const participant = await prismaClient.users.findUnique({
                     where: { id: filteredParticipants[0].id },
                  });

                  lastConversations.push({
                     id: conversation.id,
                     avatar: conversation.avatar,
                     createdAt: conversation.createdAt,
                     messages: conversation.messages,
                     participants: conversation.participants,
                     type: conversation.type,
                     updatedAt: conversation.updatedAt,
                     name: participant?.name || 'Unknown User',
                  });
               }
            }

            // Send all the conversations to user
            io.to(socket.id).emit('conversations:getAll', lastConversations);
         });
      } else {
         // Send an empty array if there is no conversation for user
         io.to(socket.id).emit('conversations:getAll', []);
      }
   });

   // ----------------------------------------------------
   const findUser = await prismaClient.users.findUnique({
      where: { email: myEmail },
   });
   const messages = await prismaClient.conversations.findFirst({
      where: {
         AND: [
            {
               participants: {
                  some: { id: '008c33f7-2a52-4faf-82c3-820bc31fe365' },
               },
            },
            {
               participants: {
                  some: {
                     id: findUser?.id,
                  },
               },
            },
         ],
      },
   });
   console.log(messages);

   socket.on(
      'conversations:getAllMessages',
      async (id, isSelectedFromContacts) => {
         const findUser = await prismaClient.users.findUnique({
            where: { email: myEmail },
         });
         if (isSelectedFromContacts) {
            const messages = await prismaClient.conversations.findFirst({
               where: {
                  participants: { some: { id: id, AND: { id: findUser?.id } } },
               },
            });
         }
      },
   );
};

export default conversationHandlers;
