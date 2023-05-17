"use client";
import Header from "@/components/conversation/Header";
import MainChatSection from "@/components/conversation/MainChatSection";
import { useState } from "react";

const ConversationChat = () => {
  const [text, setText] = useState("");
  return (
    <section className="flex flex-col justify-start items-center col-span-3 h-full">
      {/* Header */}
      <Header />

      {/* Chat Section */}
      <main className="flex-grow w-full overflow-y-auto overflow-x-hidden">
        <MainChatSection />
      </main>

      {/* Message Tools */}
      <footer className="flex w-full h-32">
        
      </footer>
    </section>
  );
};

export default ConversationChat;
