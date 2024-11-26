'use client';
import React from 'react';
import ProspectoForm from './ProspectoForm';
import { useRouter } from 'next/navigation';
import LlamadaProspectoCreate from './llamada/LlamadaProspectoCreate';
import LlamadaProspectoSearch from './llamada/LlamadaProspectoSearch';
import BoxInfo from '@/app/[locale]/components/common/BoxInfo';
import { updateProspecto } from '@/app/actions/prospecto/ProspectoActions';
import Prospecto from '@/app/api/models/prospecto/Prospecto';
import { useFormik } from 'formik';
import Utils from '@/app/api/models/common/Utils';
import ContactoProspectoView from './llamada/ContactoViewProps';
interface FormProps {
  t: any; // Función de traducción
  data: any;
  id: number; // ID del prospecto
}
const ProspectoContacto: React.FC<FormProps> = ({ t, data, id }) => {
  const router = useRouter();
  const validationSchema = Prospecto.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new Prospecto(data.prospecto),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await Utils.showLoadingNotification(t);
        await updateProspecto(values, id)
          .then((res) => {
            if (res != 204) {
              Utils.handleErrorNotification(t);
            } else {
              router.refresh();
              Utils.handleSuccessNotification(t);
            }
          })
          .catch((err) => {
            Utils.handleErrorNotification(t);
          });
      } catch (error) {
        console.error('Error in handleFormSubmit:', error);
        Utils.handleErrorNotification(t);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <h4>{`${t.Common.prospect}`}</h4>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <ProspectoForm
          t={t}
          prospectoModel={formik.values}
          setProspecto={formik.setValues}
          data={data}
          formik={formik}
        />
        <div className="d-flex justify-content-end mb-2">
          <button type="submit" className="btn btn-primary m-2">
            {t.Common.saveButton}
          </button>
        </div>
      </form>
      <hr />
      <BoxInfo title={t.Common.prospectContact}>
        <ContactoProspectoView contacto={data.prospecto?.contacto} t={t} />
      </BoxInfo>
      <hr />
      <BoxInfo title={t.Common.activities}>
        <LlamadaProspectoCreate data={data} t={t} idProspecto={id} />
        <hr />
        <LlamadaProspectoSearch data={data.llamadas} t={t} />
      </BoxInfo>
      <div className="d-flex justify-content-end mb-2">
        <button
          type="button"
          className="btn btn-danger m-2"
          onClick={async () => {
            await router.refresh();
            router.back();
          }}
        >
          {t.Common.goBack}
        </button>
      </div>
    </>
  );
};

export default ProspectoContacto;
