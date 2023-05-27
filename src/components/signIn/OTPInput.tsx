import { shallow } from "zustand/shallow";

import useSignInStore from "@/zustand/signInStore";
import Icons from "../ui/Icons";

const OTPInput = () => {
  const { isEmailSet, OTP, setOTP } = useSignInStore(
    (state) => ({ ...state }),
    shallow
  );

  return (
    <>
      {isEmailSet && (
        <div className="flex h-10 w-[80%] overflow-hidden rounded-xl bg-yellow-500 text-xs text-gray-700 md:text-base">
          <div className="flex aspect-square h-full items-center justify-center bg-yellow-600">
            {/* User SVG solid */}
            <Icons.LockSvgSolid />
          </div>
          <input
            name="confirm-code"
            type="number"
            value={String(OTP)}
            className="h-full w-full bg-transparent px-3 outline-none placeholder:text-gray-700"
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
  );
};

export default OTPInput;
