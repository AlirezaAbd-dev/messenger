import { ScaleLoader } from "react-spinners";

import useOptionStore from "@/zustand/optionsStore";

const ModalButtons = (props: { loading: boolean }) => {
  let setIsOpen = useOptionStore((state) => state.setIsModalOpen);

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="mt-4 flex justify-start">
      <button
        type="button"
        className="inline-flex justify-center rounded-xl border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-yellow-500 transition-all delay-100 hover:-translate-y-1"
        onClick={closeModal}
      >
        بستن
      </button>
      <button
        type="submit"
        disabled={props.loading}
        className={`inline-flex justify-center rounded-xl border border-transparent ${
          props.loading
            ? "border border-yellow-500 bg-zinc-900"
            : "bg-yellow-500"
        } px-4 py-2 text-sm font-medium text-zinc-950 transition-all delay-100 hover:-translate-y-1`}
      >
        {props.loading ? (
          <ScaleLoader color="rgb(234 179 8 / 1)" width={4} height={10} />
        ) : (
          "ساختن"
        )}
      </button>
    </div>
  );
};

export default ModalButtons;
