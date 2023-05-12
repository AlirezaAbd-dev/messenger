"use client";
import useSignInStore from "@/zustand/signInStore";
import { useEffect, useState } from "react";

const SubmitButton = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const isEmailSet = useSignInStore((state) => state.isEmailSet);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  if (isPageLoaded && isEmailSet) {
    return (
      <button className="text-lg w-36 h-12 md:w-64 md:h-12 flex justify-center items-center rounded-b-3xl inner-shadow-t-custom text-yellow-500">
        ورود
      </button>
    );
  }

  return <></>;
};

export default SubmitButton;
