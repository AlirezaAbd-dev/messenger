import { useState, useTransition } from "react";
import { shallow } from "zustand/shallow";
import { z } from "zod";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-hot-toast";

import useSignInStore from "@/zustand/signInStore";
import UserSvgSolid from "../ui/UserSvgSolid";
import { sendEmailAction } from "@/actions/signInActions";

const EmailInput = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [_isPending, startTransition] = useTransition();

  const { email, timer, setEmail, setIsEmailSet, startTimer } = useSignInStore(
    (state) => ({ ...state }),
    shallow
  );

  const sendCodeOnClickHandler = () => {
    const emailValidate = z.string().email();

    const result = emailValidate.safeParse(email);

    if (result.success) {
      setIsLoading(true);
      startTransition(async () => {
        sendEmailAction(email)
          .then(() => {
            setIsLoading(false);
            setIsEmailSet(true);
            toast.success("ایمیل با موفقیت ارسال شد");
          })
          .catch((err) => {
            setIsLoading(false);
            startTimer(0);
            console.log(err);
            toast.error(err.message);
          });
      });
    }
  };

  return (
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
          disabled={isLoading}
          className={`border-[3px] border-yellow-500 p-2 rounded-2xl text-yellow-500 ${
            !isLoading && "hover:text-gray-700 hover:bg-yellow-500"
          } transition-all delay-75 hover:-translate-y-1 focus:scale-105`}
          onClick={sendCodeOnClickHandler}
        >
          {isLoading ? (
            <ScaleLoader color="rgb(234 179 8 / 1)" width={4} height={10} />
          ) : (
            "ارسال کد"
          )}
        </button>
      ) : (
        <p>تلاش مجدد در: {timer} ثانیه</p>
      )}
    </>
  );
};

export default EmailInput;
