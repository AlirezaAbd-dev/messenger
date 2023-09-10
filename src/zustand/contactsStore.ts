import getContactsAction from "@/actions/getContactsAction";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Contact {
  name: string;
  email: string;
  avatar?: string;
  _id: string;
}

export interface Contacts {
  contacts: Contact[];
  fetchContacts: () => void;
  error: string;
  loading: boolean;
}

const useContactsStore = create<Contacts>()(
  devtools((set, get) => ({
    loading: false,
    error: "",
    contacts: [],
    async fetchContacts() {
      try {
        set({ loading: true });
        const contacts = await getContactsAction(
          localStorage.getItem("verify-token")!,
          localStorage.getItem("refresh-token")!
        );

        return set({ contacts, error: "", loading: false });
      } catch (err: any) {
        if (err)
          return set({
            error: err?.response?.data?.message,
            loading: false,
          });
      }
    },
  }))
);

export default useContactsStore;
