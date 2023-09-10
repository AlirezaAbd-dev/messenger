// import getContactsAction from "@/actions/getContactsAction";
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Contacts } from '@prisma/client';

export interface Contact {
   name: string;
   email: string;
   avatar?: string;
   _id: string;
}

export interface ContactsType {
   contacts: Contacts[];
   addAllContacts: (data: Contacts[]) => void;
   error: string;
   loading: boolean;
   setLoading: (loading: boolean) => void;
   setError: (errorMessage: string) => void;
}

const useContactsStore = create<ContactsType>()(
   devtools((set, _get) => ({
      loading: false,
      error: '',
      contacts: [],
      setLoading(loading: boolean) {
         set(() => ({ loading }));
      },
      setError(errorMessage) {
         set(() => ({ error: errorMessage }));
      },
      addAllContacts(data) {
         set(() => ({ contacts: data }));
      },
   })),
);

export default useContactsStore;
