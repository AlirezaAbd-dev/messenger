import mongoose from "mongoose";

interface MessageSchema {
  content: string;
  seen: boolean;
  senderId: mongoose.Types.ObjectId;
  conversationId: mongoose.Types.ObjectId;
  replyId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new mongoose.Schema<MessageSchema>(
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

const MessageModel =
  mongoose.models.Message<MessageSchema> ||
  mongoose.model<MessageSchema>("Message", messageSchema);

export default MessageModel;
