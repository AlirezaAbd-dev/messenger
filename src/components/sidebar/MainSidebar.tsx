"use client";
import { usePathname } from "next/navigation";

import SidebarTitle from "./SidebarTitle";
import ConversationCard from "./ConversationCard";
import { useEffect, useState } from "react";

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
      {/* Conversations header */}
      <SidebarTitle />

      {/* Conversation Cards list */}
      <ul className="list-none flex flex-col">
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
      </ul>
    </section>
  );
};

export default MainSidebar;
