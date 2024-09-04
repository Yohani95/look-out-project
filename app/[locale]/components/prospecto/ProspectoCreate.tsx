'use client';
import React, { useState } from 'react';
import ProspectoForm from './ProspectoForm';
import Prospecto from '@/app/api/models/prospecto/Prospecto';
import { useRouter } from 'next/navigation';
import { createProspecto } from '@/app/actions/prospecto/ProspectoActions';
import { useFormik } from 'formik';
import Utils from '@/app/api/models/common/Utils';
import ContactoPropsectoCreate from './ProspectoContacto/ContactoPropsectoCreate';
import BoxInfo from '@/app/[locale]/components/common/BoxInfo';
import ContactosProspecto from '@/app/api/models/prospecto/ContactoProspecto';
interface FormProps {
  t: any; // Función de traducción
  data: any;
}
const ProspectoCreate: React.FC<FormProps> = ({ t, data }) => {
  const router = useRouter();
  const validationSchema = Prospecto.getValidationSchema(t);
  const [statusContacto, setStatusContacto] = useState(false);
  const [contacto, setContacto] = useState(new ContactosProspecto());
  const handleContactoCreationSuccess = (contactoData) => {
    // Manejar el éxito de la creación del contacto
    setStatusContacto(true);
    setContacto(contactoData);
  };
  const formik = useFormik({
    initialValues: new Prospecto({ idContacto: contacto.id }),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        values.idContacto = contacto.id;
        setSubmitting(true);
        await Utils.showLoadingNotification(t);
        await createProspecto(values)
          .then((res) => {
            if (res.status === 400) {
              Utils.handleErrorNotification(t, router.back);
            } else {
              router.refresh();
              Utils.handleSuccessNotification(t, router.back);
            }
          })
          .catch((err) => {
            Utils.handleErrorNotification(t);
          });
      } catch (error) {
        console.error('Error in handleFormSubmit:', error);
        Utils.handleErrorNotification(t, router.back);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <ContactoPropsectoCreate
        t={t}
        data={data}
        onSuccess={handleContactoCreationSuccess}
      />
      <BoxInfo title={t.Common.prospect}>
        <form
          onSubmit={(e) => {
            formik.handleSubmit(e);
          }}
        >
          <h4>{`${t.Common.add} ${t.Common.prospect}`}</h4>
          <fieldset disabled={!statusContacto}>
            <ProspectoForm
              t={t}
              prospectoModel={formik.values}
              setProspecto={formik.setValues}
              data={data}
              formik={formik}
            />
            <div className="d-flex justify-content-end mb-2">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn btn-primary m-2"
              >
                {t.Common.saveButton}
              </button>
            </div>
          </fieldset>
        </form>
      </BoxInfo>
      <div className="d-flex justify-content-end mb-2">
        <button
          type="button"
          className="btn btn-danger m-2"
          disabled={false}
          onClick={async () => {
            await router.refresh();
            router.back();
          }}
        >
          {t.Common.cancel}
        </button>
      </div>
    </>
  );
};

export default ProspectoCreate;
