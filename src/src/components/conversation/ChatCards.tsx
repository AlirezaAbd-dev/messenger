import React from "react";
import ChatCard from "./ChatCard";

const ChatCards = () => {
  return (
    <ul className="flex flex-col list-none">
      <ChatCard seen={true} pending={false} isYou={true} />
      <ChatCard isYou={false} />
      <ChatCard seen={false} pending={false} isYou={true} />
      <ChatCard seen={false} pending={false} isYou={true} />
      <ChatCard seen={false} pending={false} isYou={true} />
      <ChatCard seen={false} pending={false} isYou={true} />
      <ChatCard seen={false} pending={false} isYou={true} />
      <ChatCard seen={false} pending={false} isYou={true} />
      <ChatCard isYou={false} />
      <ChatCard isYou={false} />
      <ChatCard seen={false} pending={true} isYou={true} />
    </ul>
  );
};

export default ChatCards;
