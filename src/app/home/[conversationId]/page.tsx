"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ConversationChat = () => {
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
    <section className="flex flex-col justify-start items-center col-span-3 h-full">
      {/* Header */}
      <div></div>
      {/* Chat Section */}
      <div></div>
      {/* Message Tools */}
      <div></div>
    </section>
  );
};

export default ConversationChat;
