import Link from "next/link";
import LockSvgSolid from "../ui/LockSvgSolid";
import UserSvgSolid from "../ui/UserSvgSolid";

const Inputs = () => {
  return (
    <section className="flex flex-col items-center justify-start gap-5 h-full mt-20 md:mt-28 w-full mb-10">
      {/* Input */}
      <div className="flex w-[80%] h-10 bg-yellow-500 text-gray-700 text-xs md:text-base rounded-xl overflow-hidden">
        <div className="flex justify-center items-center bg-yellow-600 h-full aspect-square">
          {/* User SVG solid */}
          <UserSvgSolid />
        </div>
        <input
          name="email"
          type="email"
          className="w-full h-full bg-transparent outline-none px-3 placeholder:text-gray-700"
          placeholder="ایمیل"
        />
      </div>
      {/* Button */}
      <button className="border-[3px] border-yellow-500 p-2 rounded-2xl text-yellow-500 hover:text-gray-700 hover:bg-yellow-500">
        ارسال کد
      </button>

      {/* Input */}
      {false && (
        <div className="flex w-[80%] h-10 bg-yellow-500 text-gray-700 text-xs md:text-base rounded-xl overflow-hidden">
          <div className="flex justify-center items-center bg-yellow-600 h-full aspect-square">
            {/* User SVG solid */}
            <LockSvgSolid />
          </div>
          <input
            name="confirm-code"
            type="text"
            className="w-full h-full bg-transparent outline-none px-3 placeholder:text-gray-700"
            placeholder="کد ارسالی"
            disabled
          />
        </div>
      )}

      {/* Rdirect Link Section */}
      <div className="w-full mt-3 text-[11px] md:text-[14px] font-bold text-right px-8 md:px-14">
        <Link href="#" className="text-yellow-400">
          حساب کاربری دارم!
        </Link>
      </div>
    </section>
  );
};

export default Inputs;
