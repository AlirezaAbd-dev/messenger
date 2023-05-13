"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useSignInStore from "@/zustand/signInStore";
import { signInAction } from "@/actions/signInActions";

const SubmitButton = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const isEmailSet = useSignInStore((state) => state.isEmailSet);
  const { email, OTP } = useSignInStore((state) => ({
    email: state.email,
    OTP: state.OTP,
  }));

  const router = useRouter();

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const onClickSignInHandler = useCallback(async () => {
    if (email.trim() !== "" && OTP && +OTP >= 99999) {
      try {
        // Sending data to server for signIn
        const { message, verifyToken, refreshToken } = await signInAction(
          email,
          OTP
        ).then((res) => ({ ...res }));
        // Saving tokens in localStorage and relocate
        localStorage.setItem("verify-token", verifyToken);
        localStorage.setItem("refresh-token", refreshToken);
        router.replace("/home");
      } catch (err: any) {
        console.error(err);
        alert(err.message);
      }
    }
  }, [email, OTP, router]);

  if (isPageLoaded && isEmailSet) {
    return (
      <button
        type="button"
        onClick={onClickSignInHandler}
        className="text-lg w-36 h-12 md:w-64 md:h-12 flex justify-center items-center rounded-b-3xl inner-shadow-t-custom text-yellow-500"
      >
        ورود
      </button>
    );
  }

  return <></>;
};

export default SubmitButton;
