"use client"
import React from 'react'
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation'
import DocumentoOportunidad from '@/app/api/models/oportunidad/DocumentoOportunidad';
import DocumentoOportunidadForm from './DocumentoOportunidadForm';
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { createdocumentoOportunidad,  revalidateDatadocumentoOportunidad } from '@/app/actions/Oportunidad/DocumentoOportunidadActions';
import { documentoOportunidadApiUrl } from '@/app/api/apiConfig';
function DocumentoOportunidadCreate({ t, idOportunidad }) {
    const router = useRouter();
    const validationSchema = DocumentoOportunidad.getValidationSchema(t);
    const formik = useFormik({
        initialValues: new DocumentoOportunidad(null),
        validationSchema,
        //validateOnMount: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {

                await NotificationSweet({
                    title: t.notification.loading.title,
                    text: "",
                    type: t.notification.loading.type,
                    showLoading: true,
                });
                 await fetch(documentoOportunidadApiUrl, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                  }).then(async (res) => {
                    router.refresh()
                    console.log(res)
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
                    //router.back()
                }).catch((err) => {
                    console.log(err)
                    NotificationSweet({
                        title: t.notification.error.title,
                        text: t.notification.error.text,
                        type: t.notification.error.type,
                        push: router.push,
                        link: `/opportunities/edit/${idOportunidad}/documents/search`
                    });
                });;
            } catch (error) {
                console.error("Error in handleFormSubmit:", error);
                NotificationSweet({
                    title: t.notification.error.title,
                    text: t.notification.error.text,
                    type: t.notification.error.type,
                    push: router.push,
                    link: `/opportunities/edit/${idOportunidad}/documents/search`
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
                <DocumentoOportunidadForm
                    t={t}
                    documentoModel={formik.values}
                    setDocumentoOportunidad={formik.setValues}
                    formik={formik}
                    idOportunidad={idOportunidad}
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
    )
}

export default DocumentoOportunidadCreate