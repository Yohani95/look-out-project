'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Constantes } from '@/app/api/models/common/Constantes';
import { Usuario } from '@/app/api/models/admin/Usuario';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Soporte from '@/app/api/models/support/Soporte';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import {
  EditAction,
  createAction,
  createsoporte,
} from '@/app/api/actions/soporte/SoporteActions';
import OnDemandForm from './OnDemandForm';
import Utils from '@/app/api/models/common/Utils';
function OnDemandCreate({ t, data }) {
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
        values.idTipoSoporte = Constantes.TipoSorpote.ONDEMAND;
        Utils.showLoadingNotification(t);

        await createsoporte(values)
          .then((res) => {
            EditAction();
            createAction(Constantes.TipoSorpote.ONDEMAND);
            Utils.handleSuccessNotification(t, router.back);
          })
          .catch((err) => {
            Utils.handleErrorNotification(t, router.back);
          });
      } catch (error) {
        Utils.handleErrorNotification(t, router.back);
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
          <h4>{`${t.Common.create} ${t.support.onDemandSupport}`}</h4>
          <div className="col-sm-2 text-end">
            <h6>
              {t.Common.correlative} {t.support.onDemandSupport}
              {correlativo ? ' #' : correlativo}
            </h6>
          </div>
        </div>
        <OnDemandForm
          t={t}
          soporteModel={formik.values}
          setSoporte={formik.setValues}
          data={data}
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

export default OnDemandCreate;
