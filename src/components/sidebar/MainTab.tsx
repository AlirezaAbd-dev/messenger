import { Tab } from "@headlessui/react";

const MainTab = (props: { name: string }) => {
  return (
    <Tab
      className={({ selected }) => {
        let classes =
          "relative w-fit after:transition-all after:delay-200 text-yellow-500 p-2 outline-none after:absolute after:h-[2px] after:bottom-1 after:right-[50%] after:bg-yellow-500 after:w-0";
        if (selected) {
          classes += " after:right-[0px] after:w-full";
        }
        return classes;
      }}
    >
      {props.name}
    </Tab>
  );
};

export default MainTab;
