import Image from "next/image";

import Avatar from "../../assets/images/vecteezy_abstract-black-gradient-geometric-shape-background_6644317.jpg";
import Link from "next/link";

const ConversationCard = () => {
  return (
    <Link href="/home/sa">
      <li className="flex justify-start items-center border-b-2 border-zinc-700 px-4 py-2 cursor-pointer">
        {/* Avatar */}
        <Image
          src={Avatar.src}
          alt="Avatar"
          priority
          width={100}
          height={100}
          className="rounded-full aspect-square w-14 h-14 ml-2 border border-green-500"
        />
        <div className="flex flex-col justify-between flex-grow overflow-x-hidden">
          <div className="flex justify-between">
            {/* Name */}
            <h3>علیرضا</h3>
            {/* Last Message Date */}
            <p>23:45</p>
          </div>
          {/* Last Message Ellipsis Content */}
          <p className="text-xs">سلام داداش حالت چطوره؟</p>
        </div>
      </li>
    </Link>
  );
};

export default ConversationCard;
