"use client";
import Image from "next/image";

import Avatar from "../../assets/images/vecteezy_abstract-black-gradient-geometric-shape-background_6644317.jpg";
import useOptionStore from "@/zustand/optionsStore";
import Icons from "../ui/Icons";

const ContactsPanel = () => {
  const setIsModalOpen = useOptionStore((state) => state.setIsModalOpen);

  return (
    <ul className="flex list-none flex-col">
      <button
        onClick={() => setIsModalOpen(true)}
        className="group mx-auto mb-2 flex w-fit rounded-xl border border-yellow-500 p-2 text-yellow-500 transition-all delay-100 hover:-translate-y-1 hover:bg-yellow-500 hover:text-zinc-950"
      >
        <Icons.AddContactSvg />
        اضافه کردن مخاطب
      </button>
      <li className="flex cursor-pointer items-center justify-start border-b-2 border-zinc-700 px-4 py-2 transition-colors delay-[40ms] hover:bg-zinc-900">
        <Image
          src={Avatar.src}
          alt="Avatar"
          priority
          width={100}
          height={100}
          className="ml-2 aspect-square h-14 w-14 rounded-full border border-green-500"
        />
        <div className="flex flex-grow flex-col justify-between">
          <div className="flex justify-between">
            <h3>علیرضا</h3>
          </div>
          <p className="text-xs">alireza.abedi9310@gmail.com</p>
        </div>
      </li>
    </ul>
  );
};

export default ContactsPanel;
