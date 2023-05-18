"use client";
import { useEffect, useRef, useState } from "react";
import ChatCard from "./ChatCard";

const MainChatSection = () => {
  const [isScrollBottom, setIsScrollBottom] = useState(true);

  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, []);

  return (
    <main
      className="relative h-auto w-full overflow-y-auto overflow-x-hidden scroll-smooth"
      ref={scrollRef}
      onScroll={() => {
        if (scrollRef.current) {
          console.log("scrollTop:", scrollRef.current?.scrollTop);
          console.log(
            "scrollHeight:",
            scrollRef.current?.scrollHeight - scrollRef.current.offsetHeight
          );
          if (
            +scrollRef.current.scrollTop.toFixed(0) <
            scrollRef.current.scrollHeight - scrollRef.current.offsetHeight
          ) {
            setIsScrollBottom(false);
          }
          if (
            scrollRef.current.scrollTop >=
            scrollRef.current.scrollHeight - scrollRef.current.offsetHeight
          ) {
            setIsScrollBottom(true);
          }
        }
      }}
    >
      <ul className="flex flex-col list-none">
        <ChatCard seen={true} pending={false} isYou={true} />
        <ChatCard isYou={false} />
        <ChatCard seen={false} pending={false} isYou={true} />
        <ChatCard seen={false} pending={false} isYou={true} />
        <ChatCard seen={false} pending={false} isYou={true} />
        <ChatCard seen={false} pending={false} isYou={true} />
        <ChatCard seen={false} pending={false} isYou={true} />
        <ChatCard seen={false} pending={false} isYou={true} />
        <ChatCard isYou={false} />
        <ChatCard isYou={false} />
        <ChatCard seen={false} pending={true} isYou={true} />
      </ul>
      {!isScrollBottom && (
        <div
          onClick={() => {
            if (scrollRef.current)
              scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
          }}
          className="sticky bottom-0 right-0 bg-zinc-700 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer hover:text-yellow-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      )}
    </main>
  );
};

export default MainChatSection;
