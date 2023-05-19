"use client";

import React from "react";
import SendLogoSvg from "../ui/SendLogoSvg";
import PaperClipSvg from "../ui/PaperClipSvg";

const FooterSection = () => {
  const onInputHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = e.currentTarget.scrollHeight - 20 + "px";
    console.log(e.currentTarget.scrollHeight - 10);
  };

  return (
    <footer className="flex w-full">
      <section className="flex items-center w-full m-4 mt-0 p-4 h-auto bg-zinc-700 rounded-3xl">
        <SendLogoSvg />
        <div className="flex-grow">
          <textarea
            className="w-full h-auto min-h-max px-2 bg-transparent outline-none resize-none"
            style={{ minHeight: "50px", maxHeight: "200px" }}
            onChange={onInputHandler}
          ></textarea>
        </div>
        <PaperClipSvg />
      </section>
    </footer>
  );
};

export default FooterSection;
