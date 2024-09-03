'use client';
import { updateReunionProspecto } from '@/app/actions/prospecto/ReunionProspectoActions';
import Utils from '@/app/api/models/common/Utils';
import React from 'react';
import ReunionProspectoForm from './ReunionProspectoForm';
import { useFormik } from 'formik';
import ReunionProspecto from '@/app/api/models/prospecto/ReunionProspecto';
import { useRouter } from 'next/navigation';

interface FormProps {
  t: any; // Función de traducción
  data: ReunionProspecto;
}

const ReunionProspectoEdit: React.FC<FormProps> = ({ t, data }) => {
  const router = useRouter();
  const validationSchema = ReunionProspecto.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new ReunionProspecto(data),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
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
        await Utils.showLoadingNotification(t);
        await updateReunionProspecto(values, data.id)
          .then((res) => {
            if (res != 204) {
              Utils.handleErrorNotification(t, router.back);
            } else {
              router.refresh();
              Utils.handleSuccessNotification(t, router.back);
            }
          })
          .catch((err) => {
            Utils.handleErrorNotification(t, router.back());
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
        <h4>{`${t.Common.edit} ${t.Common.meeting}`}</h4>
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

export default ReunionProspectoEdit;
