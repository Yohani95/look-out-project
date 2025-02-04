'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Utils from '@/app/api/models/common/Utils';
import RegistroHorasProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/RegistroHorasProyectoDesarrollo';
import { createRegistroHorasProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/RegistroHorasProyectoDesarrolloActions';
import RegistroHorasProyectoDesarrolloForm from './RegistroHorasProyectoDesarrolloForm';

interface FormProps {
  t: any; // Función de traducción
  data: any;
  idProfesionalProyecto: number;
}

const RegistroHorasProyectoDesarrolloCreate: React.FC<FormProps> = ({
  t,
  data,
  idProfesionalProyecto,
}) => {
  const router = useRouter();
  console.log(idProfesionalProyecto);
  const validationSchema =
    RegistroHorasProyectoDesarrollo.getValidationSchema(t);

  const formik = useFormik({
    initialValues: new RegistroHorasProyectoDesarrollo({
      idProfesionalProyecto,
    }),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await Utils.showLoadingNotification(t);
        await createRegistroHorasProyectoDesarrollo(values)
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
      <RegistroHorasProyectoDesarrolloForm
        t={t}
        registroModel={formik.values}
        setRegistro={formik.setValues}
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

export default RegistroHorasProyectoDesarrolloCreate;
