'use client';
import React from 'react';
import RolfuncionalidadSearch from './RolfuncionalidadSearch';
import Utils from '@/app/api/models/common/Utils';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import RolFuncionalidad from '@/app/api/models/admin/RolFuncionalidad';
import { createRolFuncionalidad } from '@/app/actions/admin/RolFuncionalidadActions';
interface FormProps {
  t: any; // Función de traducción
  data: any;
}
const RolFuncionalidadCreate: React.FC<FormProps> = ({ data, t }) => {
  const router = useRouter();
  const validationSchema = RolFuncionalidad.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new RolFuncionalidad(),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await Utils.showLoadingNotification(t);
        const plainValues = JSON.parse(JSON.stringify(values));
        await createRolFuncionalidad(plainValues)
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
    <>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
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
      <RolfuncionalidadSearch data={data} t={t} />
    </>
  );
};

export default RolFuncionalidadCreate;
