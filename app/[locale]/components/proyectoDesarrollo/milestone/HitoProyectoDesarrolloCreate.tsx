'use client';
import React from 'react';
import HitoProyectoDesarrolloForm from './HitoProyectoDesarrolloForm';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Utils from '@/app/api/models/common/Utils';
import HitoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/HitoProyectoDesarrollo';
import { createHitoProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/HitoProyectoDesarrolloActions';

interface FormProps {
  t: any; // Función de traducción
  data: any;
  idProyectoDesarrollo: number; // ID del proyecto
}

const HitoProyectoDesarrolloCreate: React.FC<FormProps> = ({
  t,
  data,
  idProyectoDesarrollo,
}) => {
  const router = useRouter();
  const validationSchema = HitoProyectoDesarrollo.getValidationSchema(
    t,
    data.montoRestantePorPagar,
    data.montoRestantePorPagar
  );
  const formik = useFormik({
    initialValues: new HitoProyectoDesarrollo({ idProyectoDesarrollo }),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await Utils.showLoadingNotification(t);
        await createHitoProyectoDesarrollo(values)
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
    <form
      onSubmit={(e) => {
        formik.handleSubmit(e);
      }}
    >
      <h4>{`${t.Common.add} ${t.Common.milestone}`}</h4>
      <HitoProyectoDesarrolloForm
        t={t}
        hitoModel={formik.values}
        setHito={formik.setValues}
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
  );
};

export default HitoProyectoDesarrolloCreate;
