"use client";
import { usePathname } from "next/navigation";

import Avatar from "../../assets/images/vecteezy_abstract-black-gradient-geometric-shape-background_6644317.jpg";

import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import MainTab from "./MainTab";
import ConversationsPanel from "./ConversationsPanel";
import Image from "next/image";
import AddContactSvg from "../ui/AddContactSvg";

const tabs = [
  {
    name: "مکالمات",
  },
  {
    name: "مخاطبین",
  },
];

const MainSidebar = () => {
  const [isInSlug, setIsInSlug] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.split("/")[2]) {
      setIsInSlug(true);
    } else {
      setIsInSlug(false);
    }
  }, [pathname]);

  return (
    <section
      className={`${
        isInSlug && "hidden"
      } md:block md:col-span-1 col-span-4 h-full md:border-l md:border-zinc-700 overflow-y-auto pb-16 `}
    >
      <Tab.Group>
        <Tab.List className="w-full flex justify-evenly py-2">
          {tabs.map((t, index) => (
            <MainTab key={index} name={t.name} />
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ConversationsPanel />
          </Tab.Panel>
          <Tab.Panel>
            <ul className="list-none flex flex-col">
              <button className="group border border-yellow-500 flex hover:bg-yellow-500 mx-auto rounded-xl p-2 w-fit text-yellow-500 hover:text-zinc-950 transition-all delay-100 hover:-translate-y-1">
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
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};

export default MainSidebar;
