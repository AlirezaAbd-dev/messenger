import mongoose, { Date } from "mongoose";

interface ConversationSchema {
  name: string;
  avatar: string;
  role: "PRIVATE" | "GROUP";
  participants: mongoose.ObjectId;
  messages: mongoose.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    avatar: { type: String, required: false },
    role: {
      type: String,
      enum: ["PRIVATE", "GROUP"],
      required: true,
    },
    participants: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
    },
    messages: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Message",
    },
  },
  { timestamps: true }
);

const ConversationModel = mongoose.model("Conversation", conversationSchema);

export default ConversationModel;
