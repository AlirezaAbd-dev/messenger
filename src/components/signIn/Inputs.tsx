"use client";
import { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { shallow } from "zustand/shallow";

import { sendEmailAction } from "../../actions/signInActions";
import useSignInStore from "@/zustand/signInStore";
import UserSvgSolid from "../ui/UserSvgSolid";
import LockSvgSolid from "../ui/LockSvgSolid";

const Inputs = () => {
  const [_isPending, startTransition] = useTransition();
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const {
    isEmailSet,
    email,
    timer,
    OTP,
    setEmail,
    setIsEmailSet,
    setTimer,
    setOTP,
  } = useSignInStore((state) => ({ ...state }), shallow);

  useEffect(() => {
    setIsClientLoaded(true);
    setTimer();
  }, [setTimer]);

  const sendCodeOnClickHandler = () => {
    const emailValidate = z.string().email();
    const result = emailValidate.safeParse(email);
    if (result.success) {
      setIsEmailSet(true);
      startTransition(() => {
        sendEmailAction(email)
          .then((res) => {
            alert(res);
          })
          .catch((err) => {
            alert("Error");
            console.log(err);
          });
      });
    }
  };

  return (
    <section className="flex flex-col items-center justify-start gap-5 h-full mt-20 md:mt-28 w-full mb-10">
      {isClientLoaded && (
        <>
          {/* Input */}
          <div className="flex w-[80%] h-10 bg-yellow-500 text-gray-700 text-xs md:text-base rounded-xl overflow-hidden">
            <div className="flex justify-center items-center bg-yellow-600 h-full aspect-square">
              {/* User SVG solid */}
              <UserSvgSolid />
            </div>
            <input
              name="email"
              type="email"
              value={email}
              className="w-full h-full bg-transparent outline-none px-3 placeholder:text-gray-700"
              placeholder="ایمیل"
              disabled={timer !== 0}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          {/* Button */}
          {timer === 0 ? (
            <button
              type="button"
              className="border-[3px] border-yellow-500 p-2 rounded-2xl text-yellow-500 hover:text-gray-700 hover:bg-yellow-500 transition-all delay-75 hover:-translate-y-1 focus:scale-105"
              onClick={sendCodeOnClickHandler}
            >
              ارسال کد
            </button>
          ) : (
            <p>تلاش مجدد در: {timer} ثانیه</p>
          )}
          {/* Input */}
          {isEmailSet && (
            <div className="flex w-[80%] h-10 bg-yellow-500 text-gray-700 text-xs md:text-base rounded-xl overflow-hidden">
              <div className="flex justify-center items-center bg-yellow-600 h-full aspect-square">
                {/* User SVG solid */}
                <LockSvgSolid />
              </div>
              <input
                name="confirm-code"
                type="number"
                value={String(OTP)}
                className="w-full h-full bg-transparent outline-none px-3 placeholder:text-gray-700"
                placeholder="کد ارسالی"
                onChange={(e) => {
                  if (+e.target.value === 0) {
                    setOTP(null);
                  }
                  setOTP(e.target.value);
                }}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Inputs;
