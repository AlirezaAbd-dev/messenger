import { Contact } from "@/zustand/contactsStore";
import Image from "next/image";

import Avatar from "../../assets/images/vecteezy_abstract-black-gradient-geometric-shape-background_6644317.jpg";
import Link from "next/link";

const ContactCard = (props: { contact: Contact }) => {
  return (
    <Link href={`/home/${props.contact._id}`}>
      <li className="flex cursor-pointer items-center justify-start border-b-2 border-zinc-700 px-4 py-2 transition-colors delay-[40ms] hover:bg-zinc-900">
        <Image
          src={props.contact?.avatar || Avatar.src}
          alt="Avatar"
          priority
          width={100}
          height={100}
          className="ml-2 aspect-square h-14 w-14 rounded-full border border-green-500"
        />
        <div className="flex flex-grow flex-col justify-between">
          <div className="flex justify-between">
            <h3>{props.contact.name}</h3>
          </div>
          <p className="text-xs">{props.contact.email}</p>
        </div>
      </li>
    </Link>
  );
};

export default ContactCard;
