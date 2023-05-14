"use client";
import { useEffect, useState } from "react";

import useSignInStore from "@/zustand/signInStore";
import EmailInput from "./EmailInput";
import OTPInput from "./OTPInput";

const Inputs = () => {
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const setTimer = useSignInStore((state) => state.setTimer);

  useEffect(() => {
    setIsClientLoaded(true);
    setTimer();
  }, [setTimer]);

  return (
    <section className="flex flex-col items-center justify-start gap-5 h-full mt-20 md:mt-28 w-full mb-10">
      {isClientLoaded && (
        <>
          {/* Email input and send email button */}
          <EmailInput />

          {/* OTP Input */}
          <OTPInput />
        </>
      )}
    </section>
  );
};

export default Inputs;
