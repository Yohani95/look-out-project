'use client';
import { updateContactoProspecto } from '@/app/actions/prospecto/ContactoProspectoActions';
import Utils from '@/app/api/models/common/Utils';
import React from 'react';
import ContactoProspectoForm from './ContactoProspectoForm';
import { useFormik } from 'formik';
import ContactosProspecto from '@/app/api/models/prospecto/ContactoProspecto';
import { useRouter } from 'next/navigation';
interface FormProps {
  t: any; // Función de traducción
  data: any;
}
const ContactoPropsectoEdit: React.FC<FormProps> = ({ t, data }) => {
  const router = useRouter();
  const validationSchema = ContactosProspecto.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new ContactosProspecto(data.contacto),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await Utils.showLoadingNotification(t);
        await updateContactoProspecto(values, data.contacto.id)
          .then((res) => {
            if (res != 204) {
              Utils.handleErrorNotification(t, router.back);
            } else {
              router.refresh();
              Utils.handleSuccessNotification(t, router.back);
            }
          })
          .catch((err) => {
            Utils.handleErrorNotification(t, router.back());
          });
      } catch (error) {
        console.error('Error in handleFormSubmit:', error);
        Utils.handleErrorNotification(t, router.back);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
        <h4>{`${t.Common.edit} ${t.Common.prospectContact}`}</h4>
      </div>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <ContactoProspectoForm
          t={t}
          contactoProspectoModel={formik.values}
          setContactoProspecto={formik.setValues}
          data={data}
          formik={formik}
        />
        <div className="d-flex justify-content-end mb-2">
          <button
            type="button"
            className="btn btn-danger m-2"
            onClick={async () => {
              await router.refresh();
              router.back();
            }}
          >
            {t.Common.cancel}
          </button>
          <button type="submit" className="btn btn-primary m-2">
            {t.Common.saveButton}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactoPropsectoEdit;
