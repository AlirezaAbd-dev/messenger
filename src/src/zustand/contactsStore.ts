import { create } from "zustand";

interface Contact {
  name: string;
  email: string;
  avatar: string;
}

interface Contacts {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
}

const useContactsStore = create<Contacts>()((set, get) => ({
  contacts: [],
  setContacts(contacts) {
    return set({ contacts: contacts });
  },
}));

export default useContactsStore;
