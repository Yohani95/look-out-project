'use client';
import React from 'react';
import ProspectoForm from './ProspectoForm';
import Prospecto from '@/app/api/models/prospecto/Prospecto';
import { useRouter } from 'next/navigation';
import { createProspecto } from '@/app/actions/prospecto/ProspectoActions';
import { useFormik } from 'formik';
import Utils from '@/app/api/models/common/Utils';
interface FormProps {
  t: any; // Función de traducción
  data: any;
}
const ProspectoCreate: React.FC<FormProps> = ({ t, data }) => {
  const router = useRouter();
  const validationSchema = Prospecto.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new Prospecto(),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await Utils.showLoadingNotification(t);
        await createProspecto(values)
          .then((res) => {
            if (res.status === 400) {
              Utils.handleErrorNotification(t, router.back);
            } else {
              Utils.handleSuccessNotification(t, router.back);
            }
          })
          .catch((err) => {
            Utils.handleErrorNotification(t);
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
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <h4>{`${t.Common.add} ${t.Common.prospect}`}</h4>
        <ProspectoForm
          t={t}
          prospectoModel={formik.values}
          setProspecto={formik.setValues}
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

export default ProspectoCreate;
