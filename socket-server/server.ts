import { createServer } from "http";

import express from "express";
import { Server } from "socket.io";
import { config } from "dotenv";

config({ path: "./config/.env" });
import "./env";

import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../socketTypes";
import verifyTokens from "./helpers/verifyToken";
import UserModel, { UserSchema } from "./models/UserModel";

const app = express();
const server = createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  any,
  SocketData
>(server, {
  cors: { origin: "http://localhost:3000" },
});

import "./config/dbConnect";
import { ConversationSchema } from "./models/ConversationModel";

server.listen(3001, () => {
  console.log("server socket is running on port 3001.");
});

let onlineUsers: string[] = [];

io.use((socket, next) => {
  const verifyToken = socket.handshake.headers["x-auth-token"];
  const refreshToken = socket.handshake.headers["x-refresh-token"];

  if (!verifyToken || !refreshToken) {
    next(new Error("شما دسترسی برای این کار را ندارید!"));
    return;
  }

  next();
});

io.on("connection", async (socket) => {
  const selfId = socket.id;
  let myEmail: string = "";
  let findUser: UserSchema | null;

  await verifyTokens(socket.handshake.headers, (err, email) => {
    if (err) {
      throw new Error(err);
    }
    if (email) {
      myEmail = email;
    }
  });

  if (myEmail) {
    findUser = await UserModel.findOne<UserSchema>({ email: myEmail });

    if (!findUser) {
      throw new Error("شما اجازه دسترسی به این بخش را ندارید!");
    }

    socket.join(findUser._id);

    // If user's status isn't OFF put it in onlineUsers array
    if (findUser?.status !== "OFF") {
      onlineUsers.push(findUser?._id);
      findUser.status = "ONLINE";
    }

    console.log(findUser);

    if (findUser.conversations.length > 0) {
      const conversations = await findUser.populate<ConversationSchema[]>(
        "conversations"
      );

      conversations.forEach((c) => {
        socket.join(c._id.toString());
      });

      console.log(conversations);
    }
  }

  // Error handling
  socket.on("error", (err) => {
    socket.to(selfId).emit("auth-error", err.message);
  });

  // When user disconnected
  socket.on("disconnect", async () => {
    if (findUser) {
      onlineUsers = onlineUsers.filter((u) => u !== findUser?._id);
      if (findUser.status !== "OFF") {
        findUser.status = "OFFLINE";
        await findUser.save();
      }
    }
    console.log("you are desconnected!");
  });
});
