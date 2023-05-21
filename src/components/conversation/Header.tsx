import Image from "next/image";

import Avatar from "../../assets/images/vecteezy_abstract-black-gradient-geometric-shape-background_6644317.jpg";
import OptionsIconSvg from "@/components/ui/icons/OptionsIconSvg";

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full h-14 shadow-xl py-2">
      {/* Avatar And Name */}
      <div className="flex">
        <Image
          src={Avatar.src}
          alt="Avatar"
          width={100}
          height={100}
          className="rounded-full w-11 h-11 mx-2"
        />
        <div>
          <h3>علیرضا</h3>
          <p className="text-xs text-gray-400">آخرین بازدید</p>
        </div>
      </div>
      {/* Options */}
      <div className="flex mx-2">
        <OptionsIconSvg />
      </div>
    </header>
  );
};

export default Header;
