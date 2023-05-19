"use client";

import React, { useCallback } from "react";
import SendLogoSvg from "../ui/SendLogoSvg";
import PaperClipSvg from "../ui/PaperClipSvg";

const FooterSection = () => {
  const onInputHandler = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      e.currentTarget.style.height = e.currentTarget.scrollHeight - 20 + "px";
    },
    []
  );

  return (
    <footer className="flex w-full">
      <section className="flex items-center w-full m-4 mt-0 p-4 h-auto bg-zinc-700 rounded-3xl">
        <SendLogoSvg />
        <div className="flex-grow">
          <textarea
            placeholder="پیام"
            className="w-full h-[24px] px-2 bg-transparent outline-none resize-none"
            style={{ minHeight: "24px", maxHeight: "200px" }}
            onChange={onInputHandler}
          ></textarea>
        </div>
        <PaperClipSvg />
      </section>
    </footer>
  );
};

export default FooterSection;
