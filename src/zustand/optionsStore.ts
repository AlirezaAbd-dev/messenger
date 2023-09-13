import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface OptionStore {
   myId: string;
   setMyId: (id: string) => void;
   isModalOpen: boolean;
   setIsModalOpen: (open: boolean) => void;
}

const useOptionStore = create<OptionStore>()(
   devtools((set) => ({
      myId: '',
      setMyId: (id: string) => {
         set({ myId: id });
      },
      isModalOpen: false,
      setIsModalOpen(open) {
         set(() => ({ isModalOpen: open }));
      },
   })),
);

export default useOptionStore;
