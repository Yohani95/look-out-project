'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import TarifarioVentaLicencia from '@/app/api/models/licencia/TarifarioVentaLicencia';
import TarifarioVentaLicenciaForm from './TarifarioVentaLicenciaForm';
import { updateTarifarioVentaLicencia } from '@/app/actions/licencia/TarifarioVentaLicencia';

function TarifarioVentaLicenciaEdit({ data, t, idTarifa }) {
  const router = useRouter();
  const validationSchema = TarifarioVentaLicencia.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new TarifarioVentaLicencia(data.tarifa),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await NotificationSweet({
          title: t.notification.loading.title,
          text: '',
          type: t.notification.loading.type,
          showLoading: true,
        });
        await updateTarifarioVentaLicencia(values, idTarifa)
          .then((res) => {
            if (res === 400) {
              NotificationSweet({
                title: t.notification.error.title,
                text: `${t.notification.error.text} 400`,
                type: t.notification.error.type,
              });
            } else {
              router.refresh();
              NotificationSweet({
                title: t.notification.success.title,
                text: t.notification.success.text,
                type: t.notification.success.type,
              });
            }
          })
          .catch((err) => {
            NotificationSweet({
              title: t.notification.error.title,
              text: t.notification.error.text,
              type: t.notification.error.type,
            });
          });
      } catch (error) {
        console.error('Error in handleFormSubmit:', error);
        NotificationSweet({
          title: t.notification.error.title,
          text: t.notification.error.text,
          type: t.notification.error.type,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
        <h4>{`${t.Common.edit}`}</h4>
      </div>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <TarifarioVentaLicenciaForm
          t={t}
          tarifarioModel={formik.values}
          setTarifario={formik.setValues}
          data={data}
          formik={formik}
        />
        <div className="d-flex justify-content-end mb-2">
          <button
            type="button"
            className="btn btn-danger m-2"
            onClick={() => router.back()}
          >
            {t.Common.goBack}
          </button>
          <button type="submit" className="btn btn-primary m-2">
            {t.Common.saveButton}
          </button>
        </div>
      </form>
    </>
  );
}

export default TarifarioVentaLicenciaEdit;
