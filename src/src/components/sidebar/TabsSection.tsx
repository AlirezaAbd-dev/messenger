import { Tab } from "@headlessui/react";
import MainTab from "./MainTab";
import ContactsPanel from "./ContactsPanel";
import ConversationsPanel from "./ConversationsPanel";

const tabs = [
  {
    name: "مخاطبین",
  },
  {
    name: "مکالمات",
  },
];

const TabsSection = () => {
  return (
    <Tab.Group defaultIndex={1}>
      {/* Tabs */}
      <Tab.List className="flex w-full justify-evenly py-2">
        {tabs.map((t, index) => (
          <MainTab key={index} name={t.name} />
        ))}
      </Tab.List>
      <Tab.Panels>
        {/* Contacts Panel */}
        <Tab.Panel>
          <ContactsPanel />
        </Tab.Panel>
        {/* Conversation Panel */}
        <Tab.Panel>
          <ConversationsPanel />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default TabsSection;
