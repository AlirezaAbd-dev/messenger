"use client";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import MainTab from "./MainTab";
import ConversationsPanel from "./ConversationsPanel";
import ContactsPanel from "./ContactsPanel";
import useContactsStore from "@/zustand/contactsStore";

const tabs = [
  {
    name: "مخاطبین",
  },
  {
    name: "مکالمات",
  },
];

const MainSidebar = () => {
  const fetchContacts = useContactsStore((state) => state.fetchContacts);

  const [isInSlug, setIsInSlug] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    if (pathname.split("/")[2]) {
      setIsInSlug(true);
    } else {
      setIsInSlug(false);
    }
  }, [pathname]);

  return (
    <section
      className={`${
        isInSlug && "hidden"
      } col-span-4 h-full overflow-y-auto pb-16 md:col-span-1 md:block md:border-l md:border-zinc-700 `}
    >
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
    </section>
  );
};

export default MainSidebar;
