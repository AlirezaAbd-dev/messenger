import mongoose, { Date } from "mongoose";

interface MessageSchema {
  content: string;
  seen: boolean;
  senderId: mongoose.ObjectId;
  conversationId: mongoose.ObjectId;
  replyId: mongoose.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

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
    },
    replyId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
