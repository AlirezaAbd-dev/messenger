"use client";

import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

import addContactValidation from "@/validation/addContactValidation";
import ModalMainLayout from "./ModalMainLayout";
import ModalTitle from "./ModalTitle";
import ModalDialogLayout from "./ModalDialogLayout";
import ModalInputs from "./ModalInputs";
import ModalButtons from "./ModalButtons";

export default function Modal() {
  return (
    <ModalMainLayout>
      <Formik
        initialValues={{ email: "", name: "" }}
        validationSchema={toFormikValidationSchema(addContactValidation)}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <ModalDialogLayout>
            {/* Title */}
            <ModalTitle />
            {/* Modal itself */}
            <ModalInputs />

            <ModalButtons />
          </ModalDialogLayout>
        </Form>
      </Formik>
    </ModalMainLayout>
  );
}
