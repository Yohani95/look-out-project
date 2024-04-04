import React from 'react'
import BoxInfo from "@/app/[locale]/components/common/BoxInfo";
import { useFormik } from 'formik';
import HorasUtilizadas from '@/app/api/models/support/HorasUtilizadas';
import HoursForm from './HoursForm';
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { useRouter } from 'next/navigation'
import { createhorasUtilizadas, updatehorasUtilizadas } from '@/app/api/actions/soporte/HorasUtilizadasActions';
import HoursList from './HoursList';

function PeriodAdd({ t, soporte, horasUtilizadas }) {
  //========FIN DECLARACION DE VARIABLES ===============
  const router = useRouter();
  const showNotification = (type: string, title: string, text: string) => {
    NotificationSweet({
      title: title,
      text: text,
      type: type,
    });
  };
  //   if (user?.rol?.rolId != Constantes.Roles.ADMIN) {
  //     return <p>You are not authorized to view this page!</p>;
  // }
  /*
  
     =================================================================================
     Seccion Funciones de componente
     =================================================================================
  */
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  };

  const validationSchema = HorasUtilizadas.getValidationSchema(t);
  const initialValues = new HorasUtilizadas();
  const formik = useFormik({
    initialValues,
    validationSchema,
    //validateOnMount: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { pryId, pryValor, numeroHoras, valorHoraAdicional } = soporte;
        const horasExtras = Math.max(values.horas - numeroHoras, 0);
        const montoHorasExtras = horasExtras * valorHoraAdicional;
        const horasAcumuladas = soporte.acumularHoras == true ? Math.max(numeroHoras - values.horas, 0) : 0;
        values = {
          ...values,
          idSoporte: pryId,
          monto: pryValor,
          horasExtras,
          montoHorasExtras,
          horasAcumuladas
        } as HorasUtilizadas;
        await NotificationSweet({
          title: t.notification.loading.title,
          text: "",
          type: t.notification.loading.type,
          showLoading: true,
        });
        const existingHour = horasUtilizadas.find((h) =>
          formatDate(h.fechaPeriodoDesde) === formatDate(values.fechaPeriodoDesde) &&
          formatDate(h.fechaPeriodoHasta) === formatDate(values.fechaPeriodoHasta)
        );
        if (existingHour) {
          values.id = existingHour.id;
          await updatehorasUtilizadas(values, existingHour.id).then((res) => {
            console.log(res)
            if (res != 400 && res != 500) {
              showNotification(t.notification.success.type, t.notification.success.title, t.notification.success.text);
            } else {
              showNotification(t.notification.warning.type, t.notification.warning.title, t.notification.warning.text);
            }
          }).catch((err) => {
            showNotification(t.notification.error.type, t.notification.error.title, t.notification.error.text);
          });
        } else {
          await createhorasUtilizadas(values).then((res) => {
            if (res != 400 && res != 500) {
              showNotification(t.notification.success.type, t.notification.success.title, t.notification.success.text);
            } else {
              showNotification(t.notification.warning.type, t.notification.warning.title, t.notification.warning.text);
            }
          }).catch((err) => {
            showNotification(t.notification.error.type, t.notification.error.title, t.notification.error.text);
          });
        }
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
    <BoxInfo title={t.Common.hour} startShow={true}>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <HoursForm t={t} formik={formik} soporte={soporte} />
        <div className="d-flex justify-content-end mb-2">
          <button type="submit" className="btn btn-primary m-2">
            {t.Common.saveButton}
          </button>
        </div>
      </form>
      <HoursList t={t} data={horasUtilizadas} />
    </BoxInfo>

  )
}

export default PeriodAdd