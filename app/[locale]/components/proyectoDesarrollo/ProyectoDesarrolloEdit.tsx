'use client';
import React from 'react';
import ProyectoDesarrolloForm from './ProyectoDesarrolloForm';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';
import Utils from '@/app/api/models/common/Utils';
import ProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProyectoDesarrollo';
import { updateProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/ProyectoDesarrolloActions';

interface FormProps {
  t: any; // Función de traducción
  data: any;
  id: number; // ID del proyecto
}

const ProyectoDesarrolloEdit: React.FC<FormProps> = ({ t, data, id }) => {
  const router = useRouter();
  const validationSchema = ProyectoDesarrollo.getValidationSchema(t);

  const formik = useFormik({
    initialValues: new ProyectoDesarrollo(data.proyecto),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await Utils.showLoadingNotification(t);
        await updateProyectoDesarrollo(values, id)
          .then((res) => {
            if (res != 204) {
              Utils.handleErrorNotification(t, router.back);
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
      <h4>{`${t.Common.edit} ${t.Common.project}`}</h4>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <ProyectoDesarrolloForm
          t={t}
          proyectoModel={formik.values}
          setProyecto={formik.setValues}
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

export default ProyectoDesarrolloEdit;
