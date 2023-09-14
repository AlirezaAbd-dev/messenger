'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ChatCards from './ChatCards';
import Icons from '../ui/Icons';

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
         className='relative h-auto w-full overflow-y-auto overflow-x-hidden scroll-smooth'
         ref={scrollRef}
         onScroll={onScrollHandler}
      >
         <ChatCards />
         {!isScrollBottom && (
            <div
               onClick={goToBottom}
               className='sticky bottom-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-zinc-700 hover:text-yellow-500'
            >
               <Icons.GoToBottomSvg />
            </div>
         )}
      </main>
   );
};

export default MainChatSection;
