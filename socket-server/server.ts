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

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("you are desconnected!");
  });
});
