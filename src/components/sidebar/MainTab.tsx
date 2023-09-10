import { Tab } from "@headlessui/react";

const MainTab = (props: { name: string }) => {
  return (
    <Tab
      className={({ selected }) => {
        let classes =
          "relative w-fit p-2 text-yellow-500 outline-none after:absolute after:bottom-1 after:right-[50%] after:h-[2px] after:w-0 after:bg-yellow-500 after:transition-all after:delay-200";
        if (selected) {
          classes += " after:right-[1px] after:w-full";
        }
        return classes;
      }}
    >
      {props.name}
    </Tab>
  );
};

export default MainTab;
