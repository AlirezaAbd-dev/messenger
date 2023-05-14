import mongoose, { Date } from "mongoose";

interface UserSchema {
  email: string;
  name: string;
  avatar: string;
  status: "OFF" | "OFFLINE" | "ONLINE";
  contacts: mongoose.ObjectId[];
  conversations: mongoose.ObjectId[];
  messages: mongoose.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserSchema>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: String,
    avatar: String,
    status: {
      type: String,
      enum: ["OFF", "OFFLINE", "ONLINE"],
      required: true,
      default: "OFFLINE",
    },
    contacts: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
    },
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

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
