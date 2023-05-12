import Image from "next/image";
import { ReactNode } from "react";

import background from "../../assets/images/background1.jpg";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <form
        className={`relative min-h-[700px] h-screen flex flex-col justify-center items-center bg-yellow-500 z-0`}
      >
        {/* Background */}
        <Image
          priority
          src={background.src}
          alt="background"
          width={1000}
          height={800}
          className="absolute h-full w-full background-blur -z-10 "
        />
        {children}
      </form>
    </>
  );
};

export default MainContainer;
