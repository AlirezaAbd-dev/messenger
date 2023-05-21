"use client";

import useOptionStore from "@/zustand/optionsStore";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { shallow } from "zustand/shallow";

export default function Modal() {
  let [isOpen, setIsOpen] = useOptionStore(
    (state) => [state.isModalOpen, state.setIsModalOpen],
    shallow
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div
          className="fixed inset-0 overflow-y-auto"
          style={{ direction: "rtl" }}
        >
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-right text-lg font-medium leading-6 text-yellow-500"
                >
                  اضافه کردن مخاطب
                </Dialog.Title>
                <div className="mt-2">
                    
                </div>

                <div className="mt-4 flex justify-start">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-xl border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-yellow-500 transition-all delay-100 hover:-translate-y-1"
                    onClick={closeModal}
                  >
                    بستن
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-xl border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-zinc-950 transition-all delay-100 hover:-translate-y-1"
                    onClick={closeModal}
                  >
                    ساختن
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
