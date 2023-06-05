import mongoose from "mongoose";
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
    io.to(socket.id).emit(
      "conversations:getAll",
      conversations as Conversation[]
    );
  });
};

export default conversationHandlers;
