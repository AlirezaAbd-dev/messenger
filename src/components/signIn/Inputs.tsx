import Link from "next/link";
import LockSvgSolid from "../ui/LockSvgSolid";
import UserSvgSolid from "../ui/UserSvgSolid";

const Inputs = () => {
  return (
    <section className="flex flex-col items-center justify-start gap-5 h-full w-full">
      {/* Input */}
      <div className="flex w-[80%] h-10 bg-blue-900 text-white mt-20 md:mt-28">
        <div className="flex justify-center items-center bg-slate-800 h-full aspect-square">
          {/* User SVG solid */}
          <UserSvgSolid />
        </div>
        <input
          name="email"
          type="email"
          className="w-full h-full bg-transparent outline-none px-3"
          placeholder="ایمیل"
        />
      </div>
      {/* Input */}
      <div className="flex w-[80%] h-10 bg-blue-900 text-white">
        <div className="flex justify-center items-center bg-slate-800 h-full aspect-square">
          {/* User SVG solid */}
          <LockSvgSolid />
        </div>
        <input
          name="password"
          type="password"
          className="w-full h-full bg-transparent outline-none px-3"
          placeholder="رمز عبور"
        />
      </div>

      {/* Rdirect Link Section */}
      <div className="w-full mt-5 text-[11px] md:text-[14px] font-bold text-right px-10">
        <Link href="#" className="text-slate-200">
          حساب کاربری دارم!
        </Link>
      </div>
    </section>
  );
};

export default Inputs;
