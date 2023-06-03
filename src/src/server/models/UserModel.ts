import mongoose, { InferSchemaType, Document } from "mongoose";

const contact = new mongoose.Schema({
  conversationId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["OFF", "OFFLINE", "ONLINE"],
      required: true,
      default: "OFFLINE",
    },
    contacts: [contact],
    conversations: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Conversation",
    },
    messages: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Message",
    },
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;
export interface UserSchema extends Document, User {}

const UserModel =
  mongoose.models.User<UserSchema> ||
  mongoose.model<UserSchema>("User", userSchema);

export default UserModel;
