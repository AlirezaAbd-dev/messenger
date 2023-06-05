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
import redisClient from "./config/redisClient";
import checkTokensMiddleware from "./middlewares/ckeckTokensMiddleware";
import loginHandler from "./handlers/loginHandler";
import defaultHandlers from "./handlers/defaultHandlers";

import "./config/dbConnect";
import conversationHandlers from "./handlers/conversationHandlers";

const app = express();
const server = createServer(app);
export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  any,
  SocketData
>(server, {
  cors: { origin: "http://localhost:3000" },
});

(async () => {
  await redisClient.connect();

  server.listen(3001, () => {
    console.log("server socket is running on port 3001.");
  });

  let onlineUsers: string[] = [];

  // Authorization middleware
  checkTokensMiddleware(io);

  io.on("connection", async (socket) => {
    const selfId = socket.id;

    console.log(selfId);

    const { findUser, myEmail } = await loginHandler(
      io,
      socket,
      selfId,
      onlineUsers
    ).then((res) => ({
      findUser: res?.findUser,
      myEmail: res?.myEmail as string,
    }));

    await conversationHandlers(io, socket, myEmail);

    // Default events like "error" or "disconnect"
    await defaultHandlers(socket, findUser, selfId, onlineUsers);
  });
})();
