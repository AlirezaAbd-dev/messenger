import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface OptionStore {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const useOptionStore = create<OptionStore>()(
  devtools((set) => ({
    isModalOpen: false,
    setIsModalOpen(open) {
      set(() => ({ isModalOpen: open }));
    },
  }))
);

export default useOptionStore;
