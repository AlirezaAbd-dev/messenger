'use client';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface SignInStore {
   email: string;
   setEmail: (email: string) => void;
   isEmailSet: boolean;
   setIsEmailSet: (isSet: boolean) => void;
   timer: number;
   setTimer: () => void;
   startTimer: (time: number) => void;
   OTP: number | null;
   setOTP: (OTP: string | null) => void;
}

const useSignInStore = create<SignInStore>()(
   devtools(
      persist(
         (set, get) => ({
            // Variables
            email: '',
            isEmailSet: false, 
            timer: 0,
            OTP: null,

            // Functions
            setEmail(email: string) {
               set((_state) => ({ email }));
            },
            setIsEmailSet(isSet: boolean) {
               if (isSet) {
                  get().startTimer(120);
                  get().setTimer();
               }
               set((_state) => ({ isEmailSet: isSet }));
            },

            setTimer() {
               const interval = setInterval(function () {
                  if (get().timer <= 0) {
                     clearInterval(interval);
                  } else {
                     set((state) => ({ timer: state.timer - 1 }));
                  }
               }, 1000);
            },
            startTimer(time) {
               set((_state) => ({ timer: time }));
            },

            setOTP(OTP) {
               if (Number(OTP) < 1000000) {
                  set((_state) => ({ OTP: OTP ? +OTP : null }));
               }
            },
         }),
         {
            name: 'signInStore',
            storage: createJSONStorage(() => sessionStorage),
         },
      ),
   ),
);

export default useSignInStore;
