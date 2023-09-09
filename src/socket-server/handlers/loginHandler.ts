import verifyTokens from '../helpers/verifyToken';
import { ConnectedSocket, Io } from '../types';

const loginHandler = async (
   io: Io,
   socket: ConnectedSocket,
   selfId: string,
   onlineUsers: string[],
) => {
   let myEmail: string = '';
   let findUser;

   await verifyTokens(socket.handshake.headers, (err, email) => {
      // if (err) {
      //   return socket.in(selfId).emit("auth-error", err);
      // }
      // if (email) {
      //   myEmail = email;
      // }
   });

   if (myEmail) {
      // findUser = await UserModel.findOne<UserSchema>({ email: myEmail });
      // if (!findUser) {
      //   io.to(selfId).emit("auth-error", "شما اجازه دسترسی ندارید!");
      //   return;
      // }
      // socket.join(findUser._id.toString());
      // // If user's status isn't OFF put it in onlineUsers array
      // if (findUser?.status !== "OFF") {
      //   onlineUsers.push(findUser?._id);
      //   findUser.status = "ONLINE";
      // }
      // if (findUser.conversations.length > 0) {
      //   findUser.conversations.forEach((c) => {
      //     socket.join(c._id.toString());
      //   });
      // }
   }

   socket.emit('conversations:start');

   return { findUser, myEmail };
};

export default loginHandler;
