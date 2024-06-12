"use client"
import React from 'react'
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation'
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import NovedadOportunidadForm from './NovedadOportunidadForm';
import NovedadOportunidad from '@/app/api/models/oportunidad/NovedadOportunidad';
import { updateNovedadOportunidad } from '@/app/actions/Oportunidad/NovedadOportunidadActions';
function NovedadOportunidadEdit({ t, idOportunidad,novedad }) {
    const router = useRouter();
    const validationSchema = NovedadOportunidad.getValidationSchema(t);
    const formik = useFormik({
        initialValues: new NovedadOportunidad(novedad),
        validationSchema,
        //validateOnMount: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                  values.idOportunidad=idOportunidad;
                await NotificationSweet({
                    title: t.notification.loading.title,
                    text: "",
                    type: t.notification.loading.type,
                    showLoading: true,
                });
  
                await updateNovedadOportunidad(values,values.id).then(async (res) => {
                    if (res == 400) {
                       await NotificationSweet({
                            title: t.notification.error.title,
                            text: t.notification.error.text,
                            type: t.notification.error.type,
                        });
                    } else {
                        await NotificationSweet({
                            title: t.notification.success.title,
                            text: t.notification.success.text,
                            type: t.notification.success.type,
                        });
                    }
                    router.refresh()
                    router.back()
                }).catch((err) => {
                    NotificationSweet({
                        title: t.notification.error.title,
                        text: t.notification.error.text,
                        type: t.notification.error.type,
                    });
                });
            } catch (error) {
                console.error("Error in handleFormSubmit:", error);
                NotificationSweet({
                    title: t.notification.error.title,
                    text: t.notification.error.text,
                    type: t.notification.error.type,
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
            <h4>{`${t.Nav.services.editNovelty} ${t.Opportunity.opportunity}`}</h4>
        </div>
        <NovedadOportunidadForm
            t={t}
            novedadModel={formik.values}
            setNovedadOportunidad={formik.setValues}
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

export default NovedadOportunidadEdit