"use client";
import { ScaleLoader } from "react-spinners";
import ConversationCard from "./ConversationCard";
import useConversation from "@/zustand/conversationStore";
import { shallow } from "zustand/shallow";

const ConversationsPanel = () => {
  const [conversations, isLoading] = useConversation(
    (state) => [state.conversations, state.isLoading],
    shallow
  );

  return (
    <ul className="flex list-none flex-col">
      {/* If loading is false and there is no conversation show the paragraph */}
      {!isLoading && conversations.length <= 0 && (
        <p className="mx-auto mt-10 text-gray-400">چرا با یه نفر حرف نمیزنی؟</p>
      )}

      {isLoading && conversations.length === 0 && (
        <ScaleLoader
          color="rgb(234 179 8 / 1)"
          width={10}
          height={40}
          className="mx-auto mt-10"
        />
      )}

      {!isLoading &&
        conversations.length > 0 &&
        conversations.map((c) => (
          <ConversationCard conversation={c} key={c._id} />
        ))}
    </ul>
  );
};

export default ConversationsPanel;
