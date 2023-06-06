import ConversationModel, {
  Conversation,
  ConversationSchema,
} from "../models/ConversationModel";
import UserModel, { UserSchema } from "../models/UserModel";
import { ConnectedSocket, Io } from "../types";

const conversationHandlers = async (
  io: Io,
  socket: ConnectedSocket,
  myEmail: string
) => {
  socket.on("conversations:getAll", async () => {
    console.log("finding started!");
    const findUser = (await UserModel.findOne<UserSchema>({
      email: myEmail,
    })) as UserSchema;

    const conversations: ConversationSchema[] =
      await ConversationModel.find<ConversationSchema>({
        "participants.userId": findUser._id,
      });

    console.log("conversations found");

    let lastConversations: Conversation[] = [];

    conversations.forEach(async (conversation, index) => {
      if (conversation.role === "PRIVATE") {
        const filteredParticipants = conversation.participants.filter(
          (p) => p.userId !== findUser._id
        );

        const filteredContact = findUser.contacts.find(
          (c) => c._id === filteredParticipants[0].userId
        );

        if (filteredContact) {
          lastConversations.push({
            _id: conversation._id,
            avatar: conversation.avatar,
            createdAt: conversation.createdAt,
            messages: conversation.messages,
            participants: conversation.participants,
            role: conversation.role,
            updatedAt: conversation.updatedAt,
            name: filteredContact.name,
          });
        } else {
          const participant = await UserModel.findById<UserSchema>(
            filteredParticipants[0].userId
          );
          lastConversations.push({
            _id: conversation._id,
            avatar: conversation.avatar,
            createdAt: conversation.createdAt,
            messages: conversation.messages,
            participants: conversation.participants,
            role: conversation.role,
            updatedAt: conversation.updatedAt,
            name: participant?.name || "Unknown User",
          });
        }
      }
      if (conversations.length - 1 === index) {
        console.log(lastConversations);
        io.to(socket.id).emit(
          "conversations:getAll",
          lastConversations as Conversation[]
        );
      }
    });
  });
};

export default conversationHandlers;
