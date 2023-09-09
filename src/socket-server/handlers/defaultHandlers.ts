import { Users } from "@prisma/client";
import { ConnectedSocket } from "../types";

const defaultHandlers = async (
  socket: ConnectedSocket,
  findUser: Users | undefined,
  selfId: string,
  onlineUsers: string[]
) => {
  // Error handling
  socket.on("error", (err) => {
    socket.to(selfId).emit("error", err.message);
  });

  // When user disconnected
  socket.on("disconnect", async () => {
    // if (findUser) {
    //   onlineUsers = onlineUsers.filter((u) => u !== findUser?._id);
    //   if (findUser.status !== "OFF") {
    //     findUser.status = "OFFLINE";
    //     await findUser.save();
    //   }
    // }
  });
};

export default defaultHandlers;
