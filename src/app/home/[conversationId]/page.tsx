import Header from "@/components/conversation/Header";

const ConversationChat = () => {
  return (
    <section className="flex flex-col justify-start items-center col-span-3 h-full">
      {/* Header */}
      <Header />
      {/* Chat Section */}
      <main></main>
      {/* Message Tools */}
      <footer></footer>
    </section>
  );
};

export default ConversationChat;
