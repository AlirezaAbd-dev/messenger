"use client";
import { Tab } from "@headlessui/react";
import MainTab from "./MainTab";
import ContactsPanel from "./ContactsPanel";
import ConversationsPanel from "./ConversationsPanel";
import useConversation from "@/zustand/conversationStore";
import { useEffect } from "react";
import socket from "@/socket";
import { shallow } from "zustand/shallow";

const tabs = [
  {
    name: "مخاطبین",
  },
  {
    name: "مکالمات",
  },
];

const TabsSection = () => {
  const [setConversation, setIsLoading] = useConversation(
    (state) => [state.setConversation, state.setIsLoading],
    shallow
  );

  useEffect(() => {
    setIsLoading(true);
    socket.on("conversations:start", () => {
      socket.emitWithAck("conversations:getAll").catch((err) => {
        socket.timeout(3000).emit("conversations:getAll");
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

  return (
    <Tab.Group defaultIndex={1}>
      {/* Tabs */}
      <Tab.List className="flex w-full justify-evenly py-2">
        {tabs.map((t, index) => (
          <MainTab key={index} name={t.name} />
        ))}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          {/* Contacts Panel */}
          <ContactsPanel />
        </Tab.Panel>
        <Tab.Panel>
          {/* Conversation Panel */}
          <ConversationsPanel />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default TabsSection;
