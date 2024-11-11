'use client';
import React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import DocumentoProyectoDesarrolloForm from './DocumentoProyectoDesarrolloForm';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import DocumentoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/DocumentoProyectoDesarrollo';
import {
  revalidateDataDocumentoProyectoDesarrollo,
  updateDocumentoProyectoDesarrollo,
} from '@/app/actions/proyectoDesarrollo/DocumentoProyectoDesarrolloActions';
import Utils from '@/app/api/models/common/Utils';

function DocumentoProyectoDesarrolloEdit({
  t,
  documento,
  idProyectoDesarrollo,
}) {
  const router = useRouter();
  const validationSchema = DocumentoProyectoDesarrollo.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new DocumentoProyectoDesarrollo(documento),
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

        await updateDocumentoProyectoDesarrollo(values, values.id)
          .then(async (res) => {
            if (res == 400) {
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
        Utils.handleErrorNotification(t, router.back);
      } finally {
        revalidateDataDocumentoProyectoDesarrollo();
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
          <h4>{`${t.Common.edit} ${t.Common.document} `}</h4>
        </div>
        <DocumentoProyectoDesarrolloForm
          t={t}
          documentoModel={formik.values}
          setDocumentoProyectoDesarrollo={formik.setValues}
          formik={formik}
          idProyectoDesarrollo={idProyectoDesarrollo}
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

export default DocumentoProyectoDesarrolloEdit;
