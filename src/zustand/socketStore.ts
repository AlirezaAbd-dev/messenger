import { Socket, io } from "socket.io-client";
import { create } from "zustand";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../socketTypes";

interface SocketStore {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

const useSocket = create<SocketStore>()((set) => ({
  socket: io("http://localhost:3001", {
    extraHeaders: {
      "x-auth-token": localStorage?.getItem("verify-token")!,
      "x-refresh-token": localStorage?.getItem("refresh-token")!,
    },
  }),
}));

export default useSocket;
