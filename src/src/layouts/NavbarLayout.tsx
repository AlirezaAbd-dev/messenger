"use client";

import socket from "@/socket";
import { useEffect, useState } from "react";

const NavbarLayout = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!navigator.onLine) {
      setTitle("اینترنت شما متصل نیست");
    } else {
      setTitle("در حال به روز رسانی");
      socket.on("connect", () => {
        setTitle("پیامرسان");
      });
    }
  }, [setTitle]);

  return (
    <nav className="flex h-10 w-full items-center justify-center bg-zinc-800 py-2 text-lg font-bold text-yellow-500 shadow-xl md:h-16 md:text-xl">
      <h1>{title}</h1>
    </nav>
  );
};

export default NavbarLayout;
