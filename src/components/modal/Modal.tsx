'use client';

import { useCallback } from 'react';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import addContactValidation from '@/validation/addContactValidation';
import ModalMainLayout from './ModalMainLayout';
import ModalTitle from './ModalTitle';
import ModalDialogLayout from './ModalDialogLayout';
import ModalInputs from './ModalInputs';
import ModalButtons from './ModalButtons';
import { trpc } from '@/lib/trpc/client';
import toast from 'react-hot-toast';

export default function Modal() {
   const trpcUtils = trpc.useContext();
   const { mutate, isLoading } = trpc.contact.addContact.useMutation({
      onSuccess(data) {
         if (data.headers['x-auth-token']) {
            localStorage.setItem('verify-token', data.headers['x-auth-token']);
         }

         trpcUtils.contact.getAllContacts.refetch();
      },
      onError(err) {
         toast.error(err.message);
      },
   });

   const serverAction = useCallback(
      async (name: string, email: string) => {
         mutate({ email, name });
      },
      [mutate],
   );

   return (
      <ModalMainLayout>
         <Formik
            initialValues={{ email: '', name: '' }}
            validationSchema={toFormikValidationSchema(addContactValidation)}
            onSubmit={(values) => {
               serverAction(values.name, values.email);
            }}
         >
            {({ handleSubmit }) => (
               <form onSubmit={handleSubmit}>
                  <ModalDialogLayout>
                     {/* Title */}
                     <ModalTitle />
                     {/* Modal itself */}
                     <ModalInputs />

                     <ModalButtons loading={isLoading} />
                  </ModalDialogLayout>
               </form>
            )}
         </Formik>
      </ModalMainLayout>
   );
}
