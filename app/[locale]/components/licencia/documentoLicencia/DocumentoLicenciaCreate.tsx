'use client';
import React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import DocumentoLicencia from '@/app/api/models/licencia/DocumentoLicencia';
import DocumentoLicenciaForm from './DocumentoLicenciaForm';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import { documentoLicenciaApiUrl } from '@/app/api/apiConfig';
import { createdocumentoLicencia } from '@/app/actions/licencia/DocumentoLicenciaActions';
function DocumentoLicenciaCreate({ t, idLicencia }) {
  const router = useRouter();
  const validationSchema = DocumentoLicencia.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new DocumentoLicencia(null),
    validationSchema,
    //validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await NotificationSweet({
          title: t.notification.loading.title,
          text: '',
          type: t.notification.loading.type,
          showLoading: true,
        });
        await createdocumentoLicencia(values)
          .then(async (res) => {
            router.refresh();
            console.log(res);
            if (res.status == 400) {
              NotificationSweet({
                title: t.notification.error.title,
                text: t.notification.error.text,
                type: t.notification.error.type,
              });
            } else {
              NotificationSweet({
                title: t.notification.success.title,
                text: t.notification.success.text,
                type: t.notification.success.type,
              });
            }
            router.refresh();
          })
          .catch((err) => {
            console.log(err);
            NotificationSweet({
              title: t.notification.error.title,
              text: t.notification.error.text,
              type: t.notification.error.type,
              push: router.push,
              link: `/licenses/edit/${idLicencia}/documents/search`,
            });
          });
      } catch (error) {
        console.error('Error in handleFormSubmit:', error);
        NotificationSweet({
          title: t.notification.error.title,
          text: t.notification.error.text,
          type: t.notification.error.type,
          push: router.push,
          link: `/licenses/edit/${idLicencia}/documents/search`,
        });
      } finally {
        setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
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
        <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
          <h4>{`${t.Common.create} ${t.Common.document} ${t.Opportunity.opportunity}`}</h4>
        </div>
        <DocumentoLicenciaForm
          t={t}
          documentoModel={formik.values}
          setDocumentoLicencia={formik.setValues}
          formik={formik}
          idLicencia={idLicencia}
        />
        <div className="d-flex justify-content-end mb-3">
          <button type="submit" className="btn btn-primary m-2">
            {t.Common.saveButton}
          </button>
          <button
            type="button"
            className="btn btn-danger m-2"
            onClick={(e) => {
              router.back();
            }}
          >
            {t.Common.cancel}
          </button>
        </div>
      </form>
    </>
  );
}

export default DocumentoLicenciaCreate;
