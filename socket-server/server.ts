import { createServer } from "http";

import express from "express";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

server.listen(3001, () => {
  console.log("server socket is running on port 3001.");
});
