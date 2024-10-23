'use client';
import React from 'react';
import NovedadProyectoDesarrolloForm from './NovedadProyectoDesarrolloForm';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Utils from '@/app/api/models/common/Utils';
import NovedadProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/NovedadProyectoDesarrollo';
import { updateNovedadProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/NovedadesProyectoDesarrolloActions';

interface FormProps {
  t: any; // Función de traducción
  data: any;
  id: number; // ID de la novedad
}

const NovedadProyectoDesarrolloEdit: React.FC<FormProps> = ({
  t,
  data,
  id,
}) => {
  const router = useRouter();
  const validationSchema = NovedadProyectoDesarrollo.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new NovedadProyectoDesarrollo(
      data.novedadProyectoDesarrollo
    ),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await Utils.showLoadingNotification(t);
        const plainValues = JSON.parse(JSON.stringify(values));
        await updateNovedadProyectoDesarrollo(plainValues, id)
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
      <h4>{`${t.Nav.services.editNovelty}`}</h4>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <NovedadProyectoDesarrolloForm
          t={t}
          novedadModel={formik.values}
          setNovedad={formik.setValues}
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

export default NovedadProyectoDesarrolloEdit;
