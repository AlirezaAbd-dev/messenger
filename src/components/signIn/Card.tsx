import React, { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col items-center justify-start w-60 md:w-96 bg-gray-700/40 text-white rounded-3xl">
      {children}
    </div>
  );
};

export default Card;
