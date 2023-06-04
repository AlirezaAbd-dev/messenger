import { Io } from "../types";

const checkTokensMiddleware = (io: Io) => {
  io.use((socket, next) => {
    const verifyToken = socket.handshake.headers["x-auth-token"];
    const refreshToken = socket.handshake.headers["x-refresh-token"];

    if (!verifyToken || !refreshToken) {
      next(new Error("شما دسترسی برای این کار را ندارید!"));
      return;
    }

    next();
  });
};

export default checkTokensMiddleware;
