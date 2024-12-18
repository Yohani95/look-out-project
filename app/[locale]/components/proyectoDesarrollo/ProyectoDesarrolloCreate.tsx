'use client';
import React, { useState } from 'react';
import ProyectoDesarrolloForm from './ProyectoDesarrolloForm';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Utils from '@/app/api/models/common/Utils';
import ProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProyectoDesarrollo';
import { createProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/ProyectoDesarrolloActions';

interface FormProps {
  t: any; // Función de traducción
  data: any;
}

const ProyectoDesarrolloCreate: React.FC<FormProps> = ({ t, data }) => {
  const router = useRouter();
  const validationSchema = ProyectoDesarrollo.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new ProyectoDesarrollo(),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await Utils.showLoadingNotification(t);
        await createProyectoDesarrollo(values)
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
    <>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <h4>{`${t.Common.add} ${t.Common.project}`}</h4>
        <ProyectoDesarrolloForm
          t={t}
          proyectoModel={formik.values}
          setProyecto={formik.setValues}
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
            disabled={false}
            onClick={async () => {
              await router.refresh();
              router.back();
            }}
          >
            {t.Common.cancel}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProyectoDesarrolloCreate;
