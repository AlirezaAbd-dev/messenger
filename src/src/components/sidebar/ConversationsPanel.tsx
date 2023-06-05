"use client";
import useSocket from "@/zustand/socketStore";
import ConversationCard from "./ConversationCard";
import useConversation from "@/zustand/conversationStore";

const ConversationsPanel = () => {
  const socket = useSocket((state) => state.socket);

  const [conversations] = useConversation((state) => [state.conversations]);

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
