import Image from "next/image";
import React, { ReactNode } from "react";

import background from "../../assets/images/vecteezy_3d-render-of-rgb-neon-light-on-darkness-background-abstract_8813833_197.jpg";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <form className="relative h-screen flex flex-col justify-center items-center">
      {/* Background */}
      <Image
        src={background.src}
        alt="background"
        width={1000}
        height={800}
        className="absolute h-screen w-full background-blur -z-10"
      />
      {children}
    </form>
  );
};

export default MainContainer;
