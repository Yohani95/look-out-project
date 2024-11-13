'use client';

import React from 'react';
import PlanificacionProyectoDesarrolloForm from './PlanificacionProyectoDesarrolloForm';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Utils from '@/app/api/models/common/Utils';
import PlanificacionProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/PlanificacionProyectoDesarrollo';
import { createPlanificacionProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/PlanificacionProyectoDesarrolloActions';

interface FormProps {
  t: any; // Función de traducción
  data: any;
  idProyectoDesarrollo: number; // ID del proyecto
}

const PlanificacionProyectoDesarrolloCreate: React.FC<FormProps> = ({
  t,
  data,
  idProyectoDesarrollo,
}) => {
  const router = useRouter();
  const validationSchema =
    PlanificacionProyectoDesarrollo.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new PlanificacionProyectoDesarrollo({
      idProyectoDesarrollo,
    }),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await Utils.showLoadingNotification(t);
        values.fechaActividad = values.fechaInicio;
        values.fechaTerminoReal = values.fechaTermino;
        await createPlanificacionProyectoDesarrollo(values)
          .then((res) => {
            console.log(res);
            if (res.status === 400) {
              Utils.handleErrorNotification(t, router.back);
            } else {
              router.refresh();
              Utils.handleSuccessNotification(t, router.back);
            }
          })
          .catch(() => {
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
      <h4>{`${t.Common.add} ${t.Common.planning}`}</h4>
      <PlanificacionProyectoDesarrolloForm
        t={t}
        planificacionModel={formik.values}
        setPlanificacion={formik.setValues}
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

export default PlanificacionProyectoDesarrolloCreate;
