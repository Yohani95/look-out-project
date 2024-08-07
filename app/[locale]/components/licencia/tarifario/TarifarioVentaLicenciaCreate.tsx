import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Usuario } from '@/app/api/models/admin/Usuario';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import TarifarioVentaLicencia from '@/app/api/models/licencia/TarifarioVentaLicencia';
import TarifarioVentaLicenciaForm from './TarifarioVentaLicenciaForm';
import { createTarifarioVentaLicencia } from '@/app/actions/licencia/TarifarioVentaLicencia';
import { Constantes } from '@/app/api/models/common/Constantes';

function TarifarioVentaLicenciaCreate({ data, t }) {
  const { data: session } = useSession();
  const user = session?.user as Usuario;
  const router = useRouter();
  const validationSchema = TarifarioVentaLicencia.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new TarifarioVentaLicencia(null),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await NotificationSweet({
          title: t.notification.loading.title,
          text: '',
          type: t.notification.loading.type,
          showLoading: true,
        });
        values.idVentaLicencia = data.ventaLicencia.id;
        await createTarifarioVentaLicencia(values)
          .then((res) => {
            if (res.status === 400) {
              NotificationSweet({
                title: t.notification.error.title,
                text: `${t.notification.error.text} ${res.errors.entity} 400`,
                type: t.notification.error.type,
              });
            } else {
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
            disabled={
              !(
                data.ventaLicencia.idEstado ===
                  Constantes.EstadoVentaLicencia.GANADA &&
                data.tarifario.length > 0
              )
            }
            type="button"
            className="btn btn-secondary m-2"
            onClick={() =>
              router.push(`/facture/createLicense/${data.ventaLicencia.id}`)
            }
          >
            {t.Nav.facture.requestBilling}
          </button>
          <button type="submit" className="btn btn-primary m-2">
            {t.Common.saveButton}
          </button>
        </div>
      </form>
    </>
  );
}

export default TarifarioVentaLicenciaCreate;
