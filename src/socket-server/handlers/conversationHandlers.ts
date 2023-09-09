import { ConnectedSocket, Io } from '../types';
const conversationHandlers = async (
   io: Io,
   socket: ConnectedSocket,
   myEmail: string,
) => {
   // Event calls
   socket.on('conversations:getAll', async () => {
      // console.log('finding started!');
      // // Finding user in database
      // const findUser = (await UserModel.findOne<UserSchema>({
      //    email: myEmail,
      // })) as UserSchema;
      // // Finding all conversations that has somthing to do with that user
      // const conversations: ConversationSchema[] =
      //    await ConversationModel.find<ConversationSchema>({
      //       'participants.userId': findUser._id,
      //    });
      // console.log('conversations found');
      // let lastConversations: Conversation[] = [];
      // if (conversations.length > 0) {
      //    conversations.forEach(async (conversation, index) => {
      //       if (conversation.role === 'PRIVATE') {
      //          // Remove users object from participants
      //          const filteredParticipants = conversation.participants.filter(
      //             (p) => p.userId !== findUser._id,
      //          );
      //          // Find the other participant's contact data if he/she is in the user's contacts list
      //          const filteredContact = findUser.contacts.find(
      //             (c) => c._id === filteredParticipants[0].userId,
      //          );
      //          // If he/she is in contacts list then push it to the conversations list
      //          if (filteredContact) {
      //             lastConversations.push({
      //                _id: conversation._id,
      //                avatar: conversation.avatar,
      //                createdAt: conversation.createdAt,
      //                messages: conversation.messages,
      //                participants: conversation.participants,
      //                role: conversation.role,
      //                updatedAt: conversation.updatedAt,
      //                name: filteredContact.name,
      //             });
      //          } else {
      //             // If he/she isn't in contacts list then name him/her on default if has a name or "Unknown User"
      //             const participant = await UserModel.findById<UserSchema>(
      //                filteredParticipants[0].userId,
      //             );
      //             lastConversations.push({
      //                _id: conversation._id,
      //                avatar: conversation.avatar,
      //                createdAt: conversation.createdAt,
      //                messages: conversation.messages,
      //                participants: conversation.participants,
      //                role: conversation.role,
      //                updatedAt: conversation.updatedAt,
      //                name: participant?.name || 'Unknown User',
      //             });
      //          }
      //       }
      //       // Send all the conversations to user
      //       io.to(socket.id).emit(
      //          'conversations:getAll',
      //          lastConversations as Conversation[],
      //       );
      //    });
      // } else {
      //    // Send an empty array if there is no conversation for user
      //    io.to(socket.id).emit('conversations:getAll', []);
      // }
   });
};

export default conversationHandlers;
