"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import GoToBottomSvg from "../ui/GoToBottomSvg";
import ChatCards from "./ChatCards";

const MainChatSection = () => {
  const [isScrollBottom, setIsScrollBottom] = useState(true);

  const scrollRef = useRef<HTMLElement>(null);

  const goToBottom = useCallback(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    goToBottom();
  }, [goToBottom]);

  const onScrollHandler = useCallback(() => {
    if (scrollRef.current) {
      if (
        +scrollRef.current.scrollTop.toFixed(0) <
        scrollRef.current.scrollHeight - scrollRef.current.offsetHeight
      ) {
        setIsScrollBottom(false);
      } else {
        setIsScrollBottom(true);
      }
    }
  }, []);

  return (
    <main
      className="relative h-auto w-full overflow-y-auto overflow-x-hidden scroll-smooth"
      ref={scrollRef}
      onScroll={onScrollHandler}
    >
      <ChatCards />
      {!isScrollBottom && (
        <div
          onClick={goToBottom}
          className="sticky bottom-5 right-5 bg-zinc-700 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer hover:text-yellow-500"
        >
          <GoToBottomSvg />
        </div>
      )}
    </main>
  );
};

export default MainChatSection;
