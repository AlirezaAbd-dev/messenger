import ChatCard from "./ChatCard";

const MainChatSection = () => {
  return (
    <main className="h-auto w-full overflow-y-auto overflow-x-hidden">
      <ul className="flex flex-col list-none">
        <ChatCard seen={true} pending={false} isYou={true} />
        <ChatCard isYou={false} />
        <ChatCard seen={false} pending={false} isYou={true} />
        <ChatCard seen={false} pending={true} isYou={true} />
        <ChatCard isYou={false} />
        <ChatCard isYou={false} />
      </ul>
    </main>
  );
};

export default MainChatSection;
