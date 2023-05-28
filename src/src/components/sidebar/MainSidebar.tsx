"use client";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import MainTab from "./MainTab";
import ConversationsPanel from "./ConversationsPanel";
import ContactsPanel from "./ContactsPanel";

const tabs = [
  {
    name: "مخاطبین",
  },
  {
    name: "مکالمات",
  },
];

const MainSidebar = () => {
  const [isInSlug, setIsInSlug] = useState<boolean>(false);
  const pathname = usePathname();

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
      } md:block md:col-span-1 col-span-4 h-full md:border-l md:border-zinc-700 overflow-y-auto pb-16 `}
    >
      <Tab.Group defaultIndex={1}>
        {/* Tabs */}
        <Tab.List className="w-full flex justify-evenly py-2">
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
