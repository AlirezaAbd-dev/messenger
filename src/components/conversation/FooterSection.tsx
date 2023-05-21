"use client";

import React, { useCallback, useState } from "react";
// @ts-ignore
import persianRex from "persian-rex";

import SendLogoSvg from "../ui/icons/SendLogoSvg";
import PaperClipSvg from "../ui/icons/PaperClipSvg";

const FooterSection = () => {
  const [message, setMessage] = useState<string>();

  const onInputHandler = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      setMessage(e.currentTarget.value);
      e.currentTarget.style.height = e.currentTarget.scrollHeight - 20 + "px";
    },
    []
  );

  return (
    <footer className="flex w-full">
      <section className="flex items-center w-full m-4 mt-0 p-4 h-auto bg-zinc-700 rounded-3xl">
        <SendLogoSvg />
        <div className="flex-grow" style={{ direction: "rtl" }}>
          <textarea
            value={message}
            placeholder="پیام"
            className="w-full h-[24px] px-2 bg-transparent outline-none resize-none"
            style={{
              minHeight: "24px",
              maxHeight: "200px",
              direction: !message
                ? "rtl"
                : (persianRex.rtl.test(message && message[0])
                    ? "rtl"
                    : "ltr") || "rtl",
            }}
            onChange={onInputHandler}
          ></textarea>
        </div>
        <PaperClipSvg />
      </section>
    </footer>
  );
};

export default FooterSection;
