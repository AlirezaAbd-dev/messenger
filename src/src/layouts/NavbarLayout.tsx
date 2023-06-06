"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import socket from "@/socket";

const NavbarLayout = () => {
  const [title, setTitle] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!navigator.onLine) {
      setTitle("اینترنت شما متصل نیست");
    } else {
      setTitle("در حال به روز رسانی");
      socket.on("connect", () => {
        setTitle("پیامرسان");
      });
      socket.on("connect_error", (_err) => {
        setTitle("در حال برقراری اتصال");
      });
      socket.on("auth-error", (err) => {
        console.log(err);
        router.replace("/signIn");
        socket.disconnect();
      });
    }
  }, [setTitle, router]);

  return (
    <nav className="flex h-10 w-full items-center justify-center bg-zinc-800 py-2 text-lg font-bold text-yellow-500 shadow-xl md:h-16 md:text-xl">
      <h1>{title}</h1>
    </nav>
  );
};

export default NavbarLayout;
