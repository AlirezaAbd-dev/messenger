'use client';

import { useCallback, useState } from 'react';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import addContactValidation from '@/validation/addContactValidation';
import ModalMainLayout from './ModalMainLayout';
import ModalTitle from './ModalTitle';
import ModalDialogLayout from './ModalDialogLayout';
import ModalInputs from './ModalInputs';
import ModalButtons from './ModalButtons';
import getTokens from '@/utils/getTokens';
import createContactAction from '@/actions/createContactAction';
import useContactsStore from '@/zustand/contactsStore';

export default function Modal() {
   const [loading, setLoading] = useState(false);

   const fetchContacts = useContactsStore((state) => state.fetchContacts);

   const serverAction = useCallback(
      async (name: string, email: string) => {
         const { refreshToken, verifyToken } = getTokens();
         try {
            setLoading(true);
            const [_data, token] = await createContactAction(name, email, {
               refreshToken,
               verifyToken,
            });
            setLoading(false);
            if (token) localStorage.setItem('verify-token', token);

            fetchContacts();
            return;
         } catch (err: any) {
            setLoading(false);
            alert(err.message);
         }
      },
      [fetchContacts],
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

                     <ModalButtons loading={loading} />
                  </ModalDialogLayout>
               </form>
            )}
         </Formik>
      </ModalMainLayout>
   );
}
