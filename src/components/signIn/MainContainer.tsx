"use client";
import Image from "next/image";
import React, { ReactNode } from "react";

import background from "../../assets/images/background1.jpg";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative bg-yellow-400 -z-20">
      <form
        className={`relative min-h-[700px] h-screen flex flex-col justify-center items-center`}
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
    </main>
  );
};

export default MainContainer;
