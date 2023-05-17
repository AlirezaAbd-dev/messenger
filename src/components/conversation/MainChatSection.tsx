import ChatCard from "./ChatCard";

const MainChatSection = () => {
  return (
    <ul className="flex flex-col list-none">
      <ChatCard isYou={true} />
      <ChatCard isYou={false} />
      <ChatCard isYou={true} />
      <ChatCard isYou={true} />
      <ChatCard isYou={false} />
      <ChatCard isYou={false} />
    </ul>
  );
};

export default MainChatSection;
