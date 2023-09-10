import Image from "next/image";

import Avatar from "../../assets/images/vecteezy_abstract-black-gradient-geometric-shape-background_6644317.jpg";
import Icons from "../ui/Icons";

const Header = () => {
  return (
    <header className="flex h-14 w-full items-center justify-between py-2 shadow-xl">
      {/* Avatar And Name */}
      <div className="flex flex-grow cursor-pointer hover:bg-zinc-900">
        <Image
          src={Avatar.src}
          alt="Avatar"
          width={100}
          height={100}
          className="mx-2 h-11 w-11 rounded-full"
        />
        <div>
          <h3>علیرضا</h3>
          <p className="text-xs text-gray-400">آخرین بازدید</p>
        </div>
      </div>
      {/* Options */}
      <div className="mx-2 flex">
        <Icons.OptionsIconSvg />
      </div>
    </header>
  );
};

export default Header;
