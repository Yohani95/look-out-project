'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Utils from '@/app/api/models/common/Utils';
import ProfesionalProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProfesionalProyectoDesarrollo';
import { createProfesionalProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/ProfesionalProyectoDesarrolloActions';
import ProfesionalProyectoDesarrolloForm from './ProfesionalProyectoDesarrolloForm';

interface FormProps {
  t: any; // Función de traducción
  data: any;
  idProyectoDesarrollo: number;
}

const ProfesionalProyectoDesarrolloCreate: React.FC<FormProps> = ({
  t,
  data,
  idProyectoDesarrollo,
}) => {
  const router = useRouter();
  const validationSchema = ProfesionalProyectoDesarrollo.getValidationSchema(t);

  const formik = useFormik({
    initialValues: new ProfesionalProyectoDesarrollo({ idProyectoDesarrollo }),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await Utils.showLoadingNotification(t);
        await createProfesionalProyectoDesarrollo(values)
          .then((res) => {
            if (res.status === 400) {
              Utils.handleErrorNotification(t, router.back);
            } else {
              router.refresh();
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
    <form onSubmit={formik.handleSubmit}>
      <ProfesionalProyectoDesarrolloForm
        t={t}
        profesionalModel={formik.values}
        setProfesional={formik.setValues}
        data={data}
        formik={formik}
      />
      <div className="d-flex justify-content-end mb-2">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="btn btn-primary m-2"
        >
          {t.Common.saveButton}
        </button>
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
      </div>
    </form>
  );
};

export default ProfesionalProyectoDesarrolloCreate;
