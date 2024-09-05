'use client';
import { createReunionProspecto } from '@/app/actions/prospecto/ReunionProspectoActions';
import Utils from '@/app/api/models/common/Utils';
import React from 'react';
import ReunionProspectoForm from './ReunionProspectoForm';
import { useFormik } from 'formik';
import ReunionProspecto from '@/app/api/models/prospecto/ReunionProspecto';
import { useRouter } from 'next/navigation';

interface FormProps {
  t: any; // Función de traducción
  data: any;
  idProspecto: number; // ID del prospecto al que pertenece la reunión
}

const ReunionProspectoCreate: React.FC<FormProps> = ({
  t,
  data,
  idProspecto,
}) => {
  const router = useRouter();
  const validationSchema = ReunionProspecto.getValidationSchema(t);

  const formik = useFormik({
    initialValues: new ReunionProspecto({ idProspecto }),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await Utils.showLoadingNotification(t);
        if (values.fechaReunion) {
          values.fechaReunion = new Date(
            Date.UTC(
              values.fechaReunion.getFullYear(),
              values.fechaReunion.getMonth(),
              values.fechaReunion.getDate(),
              values.fechaReunion.getHours(),
              values.fechaReunion.getMinutes(),
              values.fechaReunion.getSeconds()
            )
          );
        }
        await createReunionProspecto(values)
          .then((res) => {
            if (res.status === 400) {
              Utils.handleErrorNotification(t);
            } else {
              Utils.handleSuccessNotification(t);
            }
          })
          .catch((err) => {
            Utils.handleErrorNotification(t);
          });
      } catch (error) {
        console.error('Error in handleFormSubmit:', error);
        Utils.handleErrorNotification(t);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
        <h4>{`${t.Common.add} ${t.Common.meeting}`}</h4>
      </div>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <ReunionProspectoForm
          t={t}
          reunionProspectoModel={formik.values}
          setReunionProspecto={formik.setValues}
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

export default ReunionProspectoCreate;
