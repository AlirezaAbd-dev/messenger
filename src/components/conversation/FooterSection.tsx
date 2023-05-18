import React from "react";
import SendLogoSvg from "../ui/SendLogoSvg";
import PaperClipSvg from "../ui/PaperClipSvg";

const FooterSection = () => {
  return (
    <footer className="flex w-full">
      <section className="flex items-center w-full m-4 mt-0 p-4 h-16 bg-zinc-700 rounded-3xl">
        <SendLogoSvg />
        <div className="flex-grow">
          <textarea
            id=""
            className="w-full h-12 px-2 bg-transparent outline-none resize-none"
          ></textarea>
        </div>
        <PaperClipSvg />
      </section>
    </footer>
  );
};

export default FooterSection;
