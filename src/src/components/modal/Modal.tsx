"use client";

import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

import addContactValidation from "@/validation/addContactValidation";
import ModalMainLayout from "./ModalMainLayout";
import ModalTitle from "./ModalTitle";
import ModalDialogLayout from "./ModalDialogLayout";
import ModalInputs from "./ModalInputs";
import ModalButtons from "./ModalButtons";
import getTokens from "@/utils/getTokens";
import createContactAction from "@/actions/createContactAction";
import useContactsStore from "@/zustand/contactsStore";

export default function Modal() {
  const fetchContacts = useContactsStore((state) => state.fetchContacts);

  return (
    <ModalMainLayout>
      <Formik
        initialValues={{ email: "", name: "" }}
        validationSchema={toFormikValidationSchema(addContactValidation)}
        onSubmit={(values) => {
          const { refreshToken, verifyToken } = getTokens();
          const action = async () => {
            try {
              const [data, token] = await createContactAction(
                values.name,
                values.email,
                {
                  refreshToken,
                  verifyToken,
                }
              );

              if (token) localStorage.setItem("verify-token", token);

              fetchContacts();
              return;
            } catch (err: any) {
              alert(err.message);
            }
          };
          action();
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <ModalDialogLayout>
              {/* Title */}
              <ModalTitle />
              {/* Modal itself */}
              <ModalInputs />

              <ModalButtons />
            </ModalDialogLayout>
          </form>
        )}
      </Formik>
    </ModalMainLayout>
  );
}
