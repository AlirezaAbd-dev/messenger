import mongoose, { Document, InferSchemaType } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    senderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    conversationId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Conversation",
      required: true,
    },
    replyId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message",
      required: false,
    },
  },
  { timestamps: true }
);

type Message = InferSchemaType<typeof messageSchema>;
export interface MessageSchema extends Document, Message {}

const MessageModel =
  mongoose.models.Message<MessageSchema> ||
  mongoose.model<MessageSchema>("Message", messageSchema);

export default MessageModel;
