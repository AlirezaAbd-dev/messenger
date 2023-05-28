import Image from "next/image";

import Avatar from "../../assets/images/vecteezy_abstract-black-gradient-geometric-shape-background_6644317.jpg";
import Link from "next/link";

const ConversationCard = () => {
  return (
    <Link href="/home/sa">
      <li className="flex cursor-pointer items-center justify-start border-b-2 border-zinc-700 px-4 py-2 transition-colors delay-[40ms] hover:bg-zinc-900">
        {/* Avatar */}
        <Image
          src={Avatar.src}
          alt="Avatar"
          priority
          width={100}
          height={100}
          className="ml-2 aspect-square h-14 w-14 rounded-full border border-green-500"
        />
        <div className="flex flex-grow flex-col justify-between overflow-x-hidden">
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
