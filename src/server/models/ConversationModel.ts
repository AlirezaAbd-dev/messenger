import mongoose from "mongoose";

interface ConversationSchema {
  name: string;
  avatar: string;
  role: "PRIVATE" | "GROUP";
  participants: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const conversationSchema = new mongoose.Schema<ConversationSchema>(
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

const ConversationModel =
  mongoose.models.Conversation<ConversationSchema> ||
  mongoose.model<ConversationSchema>("Conversation", conversationSchema);

export default ConversationModel;
