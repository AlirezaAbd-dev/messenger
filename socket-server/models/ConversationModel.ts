import mongoose, { InferSchemaType } from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    avatar: { type: String, required: false },
    role: {
      type: String,
      enum: ["PRIVATE", "GROUP"],
      required: true,
      default: "PRIVATE",
    },
    participants: [
      {
        userId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "User",
        },
        avatar: {
          type: String,
          required: false,
        },
      },
    ],
    messages: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Message",
    },
  },
  { timestamps: true }
);

export type Conversation = InferSchemaType<typeof conversationSchema>;
export interface ConversationSchema extends Document, Conversation {}

const ConversationModel =
  mongoose.models.Conversation<ConversationSchema> ||
  mongoose.model<ConversationSchema>("Conversation", conversationSchema);

export default ConversationModel;
