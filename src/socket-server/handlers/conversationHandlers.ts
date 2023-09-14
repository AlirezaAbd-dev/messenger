import { ConversationType, Conversations } from '@prisma/client';
import { prismaClient } from '../server';
import { ConnectedSocket, Io } from '../types';

export type LastConversationType = Omit<Conversations, 'name'> & {
   lastMessage: {
      content: string;
      senderName: string;
      senderId: string;
      time: Date;
   };
   type: ConversationType;
   name: string;
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
         where: { participants: { some: { id: findUser?.id } } },
         include: {
            participants: true,
            messages: {
               orderBy: { createdAt: 'desc' },
               take: 1,
               select: {
                  content: true,
                  createdAt: true,
                  seen: true,
                  senderId: true,
                  sender: { select: { name: true } },
               },
            },
         },
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
                  (c) => c.contactId === filteredParticipants[0].id,
               );

               // If he/she is in contacts list then push it to the conversations list
               lastConversations.push({
                  id: conversation.id,
                  avatar: conversation.avatar,
                  createdAt: conversation.createdAt,
                  lastMessage: {
                     content: conversation.messages[0].content,
                     senderName:
                        filteredContact?.name ||
                        conversation.messages[0].sender.name,
                     senderId: conversation.messages[0].senderId,
                     time: conversation.messages[0].createdAt,
                  },
                  type: conversation.type,
                  updatedAt: conversation.updatedAt,
                  name:
                     filteredContact?.name ||
                     conversation.messages[0].sender.name,
               });
            }

            // Send all the conversations to user
            io.to(socket.id).emit('conversations:getAll', lastConversations);
         });
      } else {
         // Send an empty array if there is no conversation for user
         io.to(socket.id).emit('conversations:getAll', []);
      }
   });

   // ---------------------------------------------------

   socket.on(
      'conversations:getAllMessages',
      async (id, isSelectedFromContacts) => {
         const findUser = await prismaClient.users.findUnique({
            where: { email: myEmail },
            include: { contacts: { select: { id: true, name: true } } },
         });
         if (isSelectedFromContacts) {
            const contact = await prismaClient.contacts.findUnique({
               where: { id },
               select: { contactId: true },
            });
            const conversation = await prismaClient.conversations.findFirst({
               where: {
                  AND: [
                     {
                        participants: {
                           some: { id: findUser?.id },
                        },
                     },
                     {
                        participants: {
                           some: {
                              id:
                                 contact?.contactId === findUser?.id
                                    ? ''
                                    : contact?.contactId,
                           },
                        },
                     },
                  ],
               },
               include: {
                  messages: { orderBy: { createdAt: 'desc' }, take: 30 },
                  participants: { select: { id: true } },
               },
            });

            conversation?.messages.reverse();
            if (conversation?.type === 'PRIVATE') {
               const contactName = findUser?.contacts.find((c) => c.id === id);
               if (contactName != null) {
                  conversation.name = contactName.name;
               }
            }
            socket.emit('conversations:getAllMessages', conversation);
         }
      },
   );

   //--------------------------------------------------------
};

export default conversationHandlers;
