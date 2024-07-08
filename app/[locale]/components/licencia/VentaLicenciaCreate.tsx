"use client"
import React from 'react'
import { useSession } from "next-auth/react"
import { Usuario } from '@/app/api/models/admin/Usuario';
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import VentaLicencia from '@/app/api/models/licencia/VentaLicencia';
import { createVentaLicencia } from '@/app/actions/licencia/VentaLicenciaActions';
import VentaLicenciaForm from './VentaLicenciaForm';
function VentaLicenciaCreate({data,t}) {
  const { data: session } = useSession();
  const user = session?.user as Usuario;
  const router = useRouter();
  const validationSchema = VentaLicencia.getValidationSchema(t);
  const formik = useFormik({
      initialValues: new VentaLicencia(null),
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

              await createVentaLicencia(values).then((res) => {
                  router.refresh();
                  if(res.status == 400){
                      NotificationSweet({
                          title: t.notification.error.title,
                          text: t.notification.error.text,
                          type: t.notification.error.type,
                          push: router.push,
                          link: "/licenses/search"
                      });
                  }else{
                      NotificationSweet({
                          title: t.notification.success.title,
                          text: t.notification.success.text,
                          type: t.notification.success.type,
                          push: router.push,
                          link: "/licenses/search"
                      });
                  }
              }).catch((err) => {
                  NotificationSweet({
                      title: t.notification.error.title,
                      text: t.notification.error.text,
                      type: t.notification.error.type,
                      push: router.push,
                      link: "/licenses/search"
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
            <h4>{`${t.Common.create} ${t.Common.license}`}</h4>
        </div>
        <VentaLicenciaForm
            t={t}
            ventaLicenciaModel={formik.values}
            setVentaLicencia={formik.setValues}
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

export default VentaLicenciaCreate