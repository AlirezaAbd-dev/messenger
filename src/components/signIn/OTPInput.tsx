import useSignInStore from "@/zustand/signInStore";
import LockSvgSolid from "../ui/icons/LockSvgSolid";
import { shallow } from "zustand/shallow";

const OTPInput = () => {
  const { isEmailSet, OTP, setOTP } = useSignInStore(
    (state) => ({ ...state }),
    shallow
  );

  return (
    <>
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
  );
};

export default OTPInput;
