import socket from "@/socket";
import useConversation from "@/zustand/conversationStore";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

const useGetConversations = () => {
  const [setConversation, setIsLoading] = useConversation(
    (state) => [state.setConversation, state.setIsLoading],
    shallow
  );

  useEffect(() => {
    setIsLoading(true);
    socket.on("conversations:start", () => {
      socket.emitWithAck("conversations:getAll").catch((err) => {
        socket.timeout(2000).emit("conversations:getAll");
      });
      socket.on("conversations:getAll", (conversations) => {
        setConversation(
          conversations.map((c) => ({
            _id: c._id.toString(),
            lastMessage:
              c.messages.length > 0
                ? c.messages[c.messages.length - 1].toString()
                : "",
            name: c.name,
            lastMessageDate: new Date(c.updatedAt).toLocaleTimeString("fa"),
            avatar: c.avatar,
          }))
        );
        setIsLoading(false);
        console.log(conversations);
      });
    });
  }, [setIsLoading, setConversation]);
};

export default useGetConversations;
