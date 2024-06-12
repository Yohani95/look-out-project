"use client"
import React from 'react'
import { useSession } from "next-auth/react"
import { Usuario } from '@/app/api/models/admin/Usuario';
import { useRouter } from 'next/navigation'
import Oportunidad from '@/app/api/models/oportunidad/Oportunidad';
import { createOportunidad } from '@/app/actions/Oportunidad/OportunidadActions';
import { useFormik } from 'formik';
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import OportunidadForm from './OportunidadForm';
function OportunidadCreate({ t, data }) {
    const { data: session } = useSession();
    const user = session?.user as Usuario;
    const router = useRouter();
    //========FIN DECLARACION DE VARIABLES ===============

    // if (user?.rol?.rolId != Constantes.Roles.ADMIN) {
    //     return <p>You are not authorized to view this page!</p>;
    // }
    /*
       =================================================================================
       Seccion Funciones de componente
       =================================================================================
    */
    const validationSchema = Oportunidad.getValidationSchema(t);
    const formik = useFormik({
        initialValues: new Oportunidad(null),
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

                await createOportunidad(values).then((res) => {
                    router.refresh();
                    if(res.status == 400){
                        NotificationSweet({
                            title: t.notification.error.title,
                            text: t.notification.error.text,
                            type: t.notification.error.type,
                            push: router.push,
                            link: "/opportunities/search"
                        });
                    }else{
                        NotificationSweet({
                            title: t.notification.success.title,
                            text: t.notification.success.text,
                            type: t.notification.success.type,
                            push: router.push,
                            link: "/opportunities/search"
                        });
                    }
                }).catch((err) => {
                    NotificationSweet({
                        title: t.notification.error.title,
                        text: t.notification.error.text,
                        type: t.notification.error.type,
                        push: router.push,
                        link: "/opportunities/search"
                    });
                });
            } catch (error) {
                console.error("Error in handleFormSubmit:", error);
                NotificationSweet({
                    title: t.notification.error.title,
                    text: t.notification.error.text,
                    type: t.notification.error.type,
                    push: router.push,
                    link: "/opportunities/search"
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
                    <h4>{`${t.Common.create} ${t.Opportunity.opportunity}`}</h4>
                </div>
                <OportunidadForm
                    t={t}
                    oportunidadModel={formik.values}
                    setOportunidad={formik.setValues}
                    data={data}
                    formik={formik}
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

export default OportunidadCreate