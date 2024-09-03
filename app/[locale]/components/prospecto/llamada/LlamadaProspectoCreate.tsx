'use client';
import { createLlamadaProspecto } from '@/app/actions/prospecto/LlamadaProspectoActions';
import Utils from '@/app/api/models/common/Utils';
import React from 'react';
import LlamadaProspectoForm from './LlamadaProspectoForm';
import { useFormik } from 'formik';
import LlamadaProspecto from '@/app/api/models/prospecto/LlamadaProspecto';
import { useRouter } from 'next/navigation';

interface FormProps {
  t: any; // Función de traducción
  data: any;
  idProspecto: number;
}

const LlamadaProspectoCreate: React.FC<FormProps> = ({
  t,
  data,
  idProspecto,
}) => {
  const router = useRouter();
  const validationSchema = LlamadaProspecto.getValidationSchema(t);

  const formik = useFormik({
    initialValues: new LlamadaProspecto({ idProspecto }),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await Utils.showLoadingNotification(t);
        await createLlamadaProspecto(values)
          .then((res) => {
            if (res.status === 400) {
              Utils.handleErrorNotification(t, router.back);
            } else {
              Utils.handleSuccessNotification(t, router.back);
            }
          })
          .catch((err) => {
            Utils.handleErrorNotification(t, router.back);
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
        <h4>{`${t.Common.add} ${t.Common.activity}`}</h4>
      </div>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <LlamadaProspectoForm
          t={t}
          llamadaProspectoModel={formik.values}
          setLlamadaProspecto={formik.setValues}
          data={data}
          formik={formik}
        />
        <div className="d-flex justify-content-end mb-2">
          <button type="submit" className="btn btn-primary m-2">
            {t.Common.saveButton}
          </button>
        </div>
      </form>
    </>
  );
};

export default LlamadaProspectoCreate;
