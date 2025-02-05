'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Utils from '@/app/api/models/common/Utils';
import ProfesionalProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProfesionalProyectoDesarrollo';
import { updateProfesionalProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/ProfesionalProyectoDesarrolloActions';
import ProfesionalProyectoDesarrolloForm from './ProfesionalProyectoDesarrolloForm';

interface FormProps {
  t: any; // Función de traducción
  data: any;
  id: number;
}

const ProfesionalProyectoDesarrolloEdit: React.FC<FormProps> = ({
  t,
  data,
  id,
}) => {
  const router = useRouter();
  const validationSchema = ProfesionalProyectoDesarrollo.getValidationSchema(t);

  const formik = useFormik({
    initialValues: new ProfesionalProyectoDesarrollo(
      data.profesionalProyectoDesarrollo
    ),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await Utils.showLoadingNotification(t);
        const plainValues = JSON.parse(JSON.stringify(values));
        delete plainValues.proyectoDesarrollo;
        delete plainValues.persona;
        await updateProfesionalProyectoDesarrollo(plainValues, plainValues.id)
          .then((res) => {
            if (res != 204) {
              Utils.handleErrorNotification(t);
            } else {
              router.refresh();
              Utils.handleSuccessNotification(t, router.back);
            }
          })
          .catch((err) => {
            Utils.handleErrorNotification(t, router.back);
          });
      } catch (error) {
        console.error('Error in handleFormSubmit:', error);
        Utils.handleErrorNotification(t, router.back());
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
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
            type="button"
            className="btn btn-danger m-2"
            onClick={() => {
              router.refresh();
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

export default ProfesionalProyectoDesarrolloEdit;
