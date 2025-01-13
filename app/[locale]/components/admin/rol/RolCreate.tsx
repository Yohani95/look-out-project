'use client';
import { createRol } from '@/app/actions/admin/RolActions';
import { RolClass } from '@/app/api/models/admin/Rol';
import Utils from '@/app/api/models/common/Utils';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import RolForm from './RolForm';
interface FormProps {
  t: any; // Función de traducción
}

const RolCreate: React.FC<FormProps> = ({ t }) => {
  const router = useRouter();
  const validationSchema = RolClass.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new RolClass(),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await Utils.showLoadingNotification(t);
        const plainValues = JSON.parse(JSON.stringify(values));
        await createRol(plainValues)
          .then((res) => {
            if (res.status === 400) {
              Utils.handleErrorNotification(t, router.back);
            } else {
              router.refresh();
              Utils.handleSuccessNotification(t, router.back);
            }
          })
          .catch((err) => {
            console.log(err);
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
      <RolForm
        t={t}
        rolModel={formik.values}
        setRol={formik.setValues}
        formik={formik}
        data={[]}
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

export default RolCreate;
