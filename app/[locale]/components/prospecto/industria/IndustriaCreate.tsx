'use client';

import { createIndustria } from '@/app/actions/prospecto/IndustriaActions';
import Utils from '@/app/api/models/common/Utils';
import React from 'react';
import IndustriaForm from './IndustriaForm';
import { useFormik } from 'formik';
import Industria from '@/app/api/models/prospecto/Industria';
import { useRouter } from 'next/navigation';

interface FormProps {
  t: any; // Función de traducción
}

const IndustriaCreate: React.FC<FormProps> = ({ t }) => {
  const router = useRouter();
  const validationSchema = Industria.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new Industria(),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await Utils.showLoadingNotification(t);
        await createIndustria(values)
          .then((res) => {
            if (res.status === 400) {
              Utils.handleErrorNotification(t, router.back);
            } else {
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
        <h4>{`${t.Common.add} ${t.Common.industry}`}</h4>
      </div>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <IndustriaForm
          t={t}
          industriaModel={formik.values}
          setIndustria={formik.setValues}
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

export default IndustriaCreate;
