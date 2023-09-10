'use client';

import { shallow } from 'zustand/shallow';
import { z } from 'zod';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';

import useSignInStore from '@/zustand/signInStore';
import Icons from '../ui/Icons';
import { trpc } from '@/lib/trpc/client';

const EmailInput = () => {
   const { mutate, isLoading } = trpc.sign.sendOTP.useMutation({
      onSuccess() {
         setIsEmailSet(true);
         toast.success('ایمیل با موفقیت ارسال شد✅');
      },
      onError(err) {
         startTimer(0);
         toast.error(err.message);
      },
   });

   const { email, timer, setEmail, setIsEmailSet, startTimer } = useSignInStore(
      (state) => ({ ...state }),
      shallow,
   );

   const sendCodeOnClickHandler = () => {
      const emailValidate = z.string().email();

      const result = emailValidate.safeParse(email);

      if (result.success) {
         mutate({ email });
      } else {
         toast.error('لطفا ایمیل را به درستی وارد نمایید');
      }
   };

   return (
      <>
         {/* Input */}
         <div className='flex h-10 w-[80%] overflow-hidden rounded-xl bg-yellow-500 text-xs text-gray-700 md:text-base'>
            <div className='flex aspect-square h-full items-center justify-center bg-yellow-600'>
               {/* User SVG solid */}
               <Icons.UserSvgSolid />
            </div>
            <input
               name='email'
               type='email'
               value={email}
               className='h-full w-full bg-transparent px-3 outline-none placeholder:text-gray-700'
               placeholder='ایمیل'
               disabled={timer !== 0}
               onChange={(e) => {
                  setEmail(e.target.value);
               }}
            />
         </div>
         {/* Button */}
         {timer === 0 ? (
            <button
               type='button'
               disabled={isLoading}
               className={`rounded-2xl border-[3px] border-yellow-500 p-2 text-yellow-500 ${
                  !isLoading && 'hover:bg-yellow-500 hover:text-gray-700'
               } transition-all delay-75 hover:-translate-y-1 focus:scale-105`}
               onClick={sendCodeOnClickHandler}
            >
               {isLoading ? (
                  <ScaleLoader
                     color='rgb(234 179 8 / 1)'
                     width={4}
                     height={10}
                  />
               ) : (
                  'ارسال کد'
               )}
            </button>
         ) : (
            <p>تلاش مجدد در: {timer} ثانیه</p>
         )}
      </>
   );
};

export default EmailInput;
