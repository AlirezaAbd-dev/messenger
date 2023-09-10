"use client";

import useOptionStore from "@/zustand/optionsStore";
import Icons from "../ui/Icons";
import useContactsStore from "@/zustand/contactsStore";
import { shallow } from "zustand/shallow";
import ContactCard from "./ContactCard";
import { ScaleLoader } from "react-spinners";

const ContactsPanel = () => {
  const setIsModalOpen = useOptionStore((state) => state.setIsModalOpen);
  const [contacts, error, loading] = useContactsStore(
    (state) => [state.contacts, state.error, state.loading],
    shallow
  );

  return (
    <ul className="flex list-none flex-col">
      <button
        onClick={() => setIsModalOpen(true)}
        className="group mx-auto mb-2 flex w-fit rounded-xl border border-yellow-500 p-2 text-yellow-500 transition-all delay-100 hover:-translate-y-1 hover:bg-yellow-500 hover:text-zinc-950"
      >
        <Icons.AddContactSvg />
        اضافه کردن مخاطب
      </button>

      {error && <p className="mx-auto">{error}</p>}

      {loading && (
        <ScaleLoader
          color="rgb(234 179 8 / 1)"
          width={10}
          height={40}
          className="mx-auto mt-10"
        />
      )}
      {!error &&
        !loading &&
        contacts &&
        contacts.map((c) => <ContactCard contact={c} key={c._id} />)}
    </ul>
  );
};

export default ContactsPanel;
