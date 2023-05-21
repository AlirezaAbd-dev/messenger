"use client";
import Image from "next/image";

import AddContactSvg from "../ui/icons/AddContactSvg";
import Avatar from "../../assets/images/vecteezy_abstract-black-gradient-geometric-shape-background_6644317.jpg";
import useOptionStore from "@/zustand/optionsStore";

const ContactsPanel = () => {
  const setIsModalOpen = useOptionStore((state) => state.setIsModalOpen);

  return (
    <ul className="list-none flex flex-col">
      <button
        onClick={() => setIsModalOpen(true)}
        className="group border border-yellow-500 flex hover:bg-yellow-500 mx-auto rounded-xl p-2 w-fit text-yellow-500 hover:text-zinc-950 transition-all delay-100 hover:-translate-y-1"
      >
        <AddContactSvg />
        اضافه کردن مخاطب
      </button>
      <li className="flex justify-start items-center border-b-2 border-zinc-700 px-4 py-2 cursor-pointer">
        <Image
          src={Avatar.src}
          alt="Avatar"
          priority
          width={100}
          height={100}
          className="rounded-full aspect-square w-14 h-14 ml-2 border border-green-500"
        />
        <div className="flex flex-col justify-between flex-grow">
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
