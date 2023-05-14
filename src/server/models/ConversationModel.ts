import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    avatar: { type: String, required: false },
    role: {
      type: "private" || "group",
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
