import mongoose, { InferSchemaType } from "mongoose";

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

type Conversation = InferSchemaType<typeof conversationSchema>;
export interface ConversationSchema extends Document, Conversation {}

const ConversationModel =
  mongoose.models.Conversation<ConversationSchema> ||
  mongoose.model<ConversationSchema>("Conversation", conversationSchema);

export default ConversationModel;
