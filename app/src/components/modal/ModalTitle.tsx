import { Dialog } from "@headlessui/react";

const ModalTitle = () => {
  return (
    <Dialog.Title
      as="h3"
      className="text-right text-lg font-medium leading-6 text-yellow-500"
    >
      اضافه کردن مخاطب
    </Dialog.Title>
  );
};

export default ModalTitle;
