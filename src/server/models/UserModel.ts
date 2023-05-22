import mongoose from "mongoose";

export interface UserSchema {
  email: string;
  name: string;
  avatar?: string;
  status: "OFF" | "OFFLINE" | "ONLINE";
  contacts?: Contact[];
  conversations?: mongoose.Types.ObjectId[];
  messages?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface Contact {
  name: string;
  email: string;
}

const contact = new mongoose.Schema<Contact>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema<UserSchema>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: "String",
      default: "",
    },
    avatar: {
      type: "String",
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

const UserModel =
  mongoose.models.User<UserSchema> ||
  mongoose.model<UserSchema>("User", userSchema);

export default UserModel;
