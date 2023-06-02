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
import UserModel from "./models/UserModel";

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

server.listen(3001, () => {
  console.log("server socket is running on port 3001.");
});

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

  UserModel.findOne({ email: "" });

  // Error handling
  socket.on("error", (err) => {
    socket.to(selfId).emit("auth-error", err.message);
  });

  // When user disconnected
  socket.on("disconnect", () => {
    console.log("you are desconnected!");
  });
});
