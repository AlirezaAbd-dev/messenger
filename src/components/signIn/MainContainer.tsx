"use client";
import Image from "next/image";
import { ReactNode } from "react";

import background from "../../assets/images/28_Juli_2019_(14).jpg";

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
          className="absolute h-full w-full -z-10 blur-[10px] md:blur-md"
        />
        {children}
      </form>
    </>
  );
};

export default MainContainer;
