'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';

import useSignInStore from '@/zustand/signInStore';
import { trpc } from '@/lib/trpc/client';
// import { signInAction } from "@/actions/signInActions";

const SubmitButton = () => {
   const { mutate, isLoading } = trpc.sign.signIn.useMutation({
      onSuccess(data) {
         console.log(data);
         localStorage.setItem('verify-token', data?.headers['x-auth-token']!);
         localStorage.setItem(
            'refresh-token',
            data?.headers['x-refresh-token']!,
         );
         router.replace('/home');
      },
      onError(err) {
         toast.error(err.message);
      },
      onSettled() {
         setOTP(null);
      },
   });

   const [isPageLoaded, setIsPageLoaded] = useState(false);

   const isEmailSet = useSignInStore((state) => state.isEmailSet);
   const { email, OTP, setOTP } = useSignInStore((state) => ({
      email: state.email,
      OTP: state.OTP,
      setOTP: state.setOTP,
   }));

   const router = useRouter();

   useEffect(() => {
      setIsPageLoaded(true);
   }, []);

   const onClickSignInHandler = useCallback(async () => {
      if (OTP === null || OTP <= 99999) {
         toast.error('لطفا کد ارسالی را وارد نمایید');
      }
      if (email.trim() !== '' && OTP && +OTP >= 99999) {
         mutate({ email, OTP });
         //  try {
         // setIsLoading(true);
         // Sending data to server for signIn
         // const { message, verifyToken, refreshToken } = await signInAction(
         //   email,
         //   OTP
         // ).then((res) => {
         //   setIsLoading(false);
         //   return { ...res };
         // });
         // Saving tokens in localStorage and relocate
         // localStorage.setItem("verify-token", verifyToken);
         // localStorage.setItem("refresh-token", refreshToken);
         //     router.replace('/home');
         //  } catch (err: any) {
         //     setIsLoading(false);
         //     console.error(err);
         //     toast.error(err.message);
         //  } finally {
         //     setOTP(null);
         //  }
      }
   }, [email, OTP, mutate]);

   if (isPageLoaded && isEmailSet) {
      return (
         <button
            type='button'
            disabled={isLoading}
            onClick={onClickSignInHandler}
            className='text-lg w-36 h-12 md:w-64 md:h-12 flex justify-center items-center rounded-b-3xl inner-shadow-t-custom text-yellow-500'
         >
            {isLoading ? (
               <ScaleLoader
                  color='rgb(234 179 8 / 1)'
                  width={4}
                  height={10}
               />
            ) : (
               'ورود'
            )}
         </button>
      );
   }

   return <></>;
};

export default SubmitButton;
