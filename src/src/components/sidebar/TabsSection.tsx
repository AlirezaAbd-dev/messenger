"use client";
import { Tab } from "@headlessui/react";
import MainTab from "./MainTab";
import ContactsPanel from "./ContactsPanel";
import ConversationsPanel from "./ConversationsPanel";
import useSocket from "@/zustand/socketStore";
import useConversation from "@/zustand/conversationStore";
import { useEffect, useState } from "react";
import socket from "@/socket";

const tabs = [
  {
    name: "مخاطبین",
  },
  {
    name: "مکالمات",
  },
];

const TabsSection = () => {
  const [setConversation] = useConversation((state) => [state.setConversation]);

  useEffect(() => {
    setTimeout(() => {
      socket.emit("conversations:getAll");
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
        console.log(conversations);
      });
    }, 1000);
  }, [socket.active, setConversation]);

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
