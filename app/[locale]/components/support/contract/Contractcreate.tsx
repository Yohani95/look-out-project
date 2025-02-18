'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Constantes } from '@/app/api/models/common/Constantes';
import { Usuario } from '@/app/api/models/admin/Usuario';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import SupportForm from '../SupportForm';
import Soporte from '@/app/api/models/support/Soporte';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import { createsoporte } from '@/app/api/actions/soporte/SoporteActions';
function Contractcreate({ t, data }) {
  const { data: session } = useSession();
  const user = session?.user as Usuario;
  const [correlativo, setCorrelativo] = useState([]);
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
  const validationSchema = Soporte.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new Soporte(null),
    validationSchema,
    //validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Utiliza una variable para almacenar la función handleFormSubmit
        values.idTipoSoporte = Constantes.TipoSorpote.CONTRATO;
        await NotificationSweet({
          title: t.notification.loading.title,
          text: '',
          type: t.notification.loading.type,
          showLoading: true,
        });

        await createsoporte(values)
          .then((res) => {
            router.refresh();
            NotificationSweet({
              title: t.notification.success.title,
              text: t.notification.success.text,
              type: t.notification.success.type,
              push: router.push,
              link: '/business/Support/search',
            });
          })
          .catch((err) => {
            NotificationSweet({
              title: t.notification.error.title,
              text: t.notification.error.text,
              type: t.notification.error.type,
              push: router.push,
              link: '/business/Support/search',
            });
          });
      } catch (error) {
        console.error('Error in handleFormSubmit:', error);
        NotificationSweet({
          title: t.notification.error.title,
          text: t.notification.error.text,
          type: t.notification.error.type,
          push: router.push,
          link: '/business/Support/search',
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
          <h6 className="text-[#2f4bce]  font-bold">Cuenta asociada</h6>
          <div className="col-sm-2 text-end">
            <h6>
              {t.Common.correlative} {t.Common.supports}
              {correlativo ? '#' : correlativo}
            </h6>
          </div>
        </div>
        <SupportForm
          t={t}
          soporteModel={formik.values}
          setSoporte={formik.setValues}
          data={data}
        />
        <div className="d-flex justify-content-end mb-3">
          <button
            type="button"
            className="btn btn-secondary m-2"
            onClick={(e) => {
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
}

export default Contractcreate;
