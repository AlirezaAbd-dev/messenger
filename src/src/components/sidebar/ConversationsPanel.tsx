"use client";
import useSocket from "@/zustand/socketStore";
import ConversationCard from "./ConversationCard";
import useConversation from "@/zustand/conversationStore";
import { useEffect } from "react";

const ConversationsPanel = () => {
  const socket = useSocket((state) => state.socket);

  const [conversations, setConversation] = useConversation((state) => [
    state.conversations,
    state.setConversation,
  ]);

  useEffect(() => {
    socket.emit("conversations:getAll");
    socket.on("conversations:getAll", (conversations) => {
      console.log(conversations);
      setConversation(
        conversations.map((c) => ({
          _id: c._id.toString(),
          lastMessage:
            c.messages.length > 0
              ? c.messages[c.messages.length - 1].toString()
              : "",
          name: c.name,
          lastMessageDate: c.updatedAt.toString(),
          avatar: c.avatar,
        }))
      );

      console.log(conversations);
    });
  }, [socket, setConversation]);
  return (
    <ul className="flex list-none flex-col">
      {conversations.length <= 0 && (
        <p className="mx-auto mt-10 text-gray-400">چرا با یه نفر حرف نمیزنی؟</p>
      )}
      {conversations.length > 0 &&
        conversations.map((c) => (
          <ConversationCard conversation={c} key={c._id} />
        ))}
    </ul>
  );
};

export default ConversationsPanel;
