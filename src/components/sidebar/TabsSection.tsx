"use client";
import { Tab } from "@headlessui/react";
import MainTab from "./MainTab";
import ContactsPanel from "./ContactsPanel";
import ConversationsPanel from "./ConversationsPanel";
import useGetConversations from "@/hooks/useGetConversations";

const tabs = [
  {
    name: "مخاطبین",
  },
  {
    name: "مکالمات",
  },
];

const TabsSection = () => {
  //! This hook gets all conversations from socket server
  useGetConversations();

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
