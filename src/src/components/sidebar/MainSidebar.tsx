"use client";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import useContactsStore from "@/zustand/contactsStore";
import TabsSection from "./TabsSection";
import useAuthorization from "@/hooks/useAuthorization";

const MainSidebar = () => {
  // Authorization
  useAuthorization();
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
      <TabsSection />
    </section>
  );
};

export default MainSidebar;
