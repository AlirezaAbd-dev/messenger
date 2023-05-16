import Image from "next/image";

import Avatar from "../../assets/images/vecteezy_abstract-black-gradient-geometric-shape-background_6644317.jpg";

const ConversationCard = () => {
  return (
    <li className="flex justify-start items-center border-b-2 border-zinc-700 px-4 py-2 cursor-pointer">
      <Image
        src={Avatar.src}
        alt="Avatar"
        priority
        width={100}
        height={100}
        className="rounded-full aspect-square w-14 h-14 ml-2"
      />
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex justify-between">
          <h3>علیرضا</h3>
          <p>23:45</p>
        </div>
        <p className="text-xs">سلام داداش حالت چطوره؟</p>
      </div>
    </li>
  );
};

export default ConversationCard;
