import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { shallow } from 'zustand/shallow';

import useOptionStore from '@/zustand/optionsStore';

const ModalMainLayout = (props: { children: ReactNode }) => {
   let [isOpen, setIsOpen] = useOptionStore(
      (state) => [state.isModalOpen, state.setIsModalOpen],
      shallow,
   );

   function closeModal() {
      setIsOpen(false);
   }

   return (
      <Transition
         appear
         show={isOpen}
         as={Fragment}
      >
         <Dialog
            as='div'
            className='relative z-10'
            onClose={closeModal}
         >
            <Transition.Child
               as={Fragment}
               enter='ease-out duration-300'
               enterFrom='opacity-0'
               enterTo='opacity-100'
               leave='ease-in duration-200'
               leaveFrom='opacity-100'
               leaveTo='opacity-0'
            >
               <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>
            {props.children}
         </Dialog>
      </Transition>
   );
};

export default ModalMainLayout;
