'use client';

import React, { useCallback, useState } from 'react';
// @ts-ignore
import persianRex from 'persian-rex';
import { Paperclip, Send } from 'lucide-react';


const FooterSection = () => {
   const [message, setMessage] = useState<string>();

   const onInputHandler = useCallback(
      (e: React.FormEvent<HTMLTextAreaElement>) => {
         setMessage(e.currentTarget.value);
         e.currentTarget.style.height =
            e.currentTarget.scrollHeight - 20 + 'px';
      },
      [],
   );

   return (
      <footer className='flex w-full'>
         <section className='m-4 mt-0 flex h-auto w-full items-center rounded-3xl bg-zinc-700 p-4'>
            <Send className='cursor-pointer hover:text-yellow-500' />
            <div
               className='flex-grow'
               style={{ direction: 'rtl' }}
            >
               <textarea
                  value={message}
                  placeholder='پیام خود را بنویسید!'
                  className='h-[24px] w-full resize-none bg-transparent px-2 outline-none'
                  style={{
                     minHeight: '24px',
                     maxHeight: '200px',
                     direction: !message
                        ? 'rtl'
                        : (persianRex.rtl.test(message && message[0])
                             ? 'rtl'
                             : 'ltr') || 'rtl',
                  }}
                  onChange={onInputHandler}
               ></textarea>
            </div>
            <Paperclip className='cursor-pointer hover:text-yellow-500' />
         </section>
      </footer>
   );
};

export default FooterSection;
