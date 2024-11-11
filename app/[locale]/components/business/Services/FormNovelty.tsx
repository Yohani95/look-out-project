'use client';
import React, { useState, useEffect } from 'react';
import { fetchNoveltyType } from '@/app/[locale]/utils/business/Novelty/UtilsNovelType';
import { handleFormSubmit } from '@/app/[locale]/utils/Form/UtilsForm';
import Novedad from '@/app/api/models/proyecto/Novedad';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import LoadingData from '@/app/[locale]/components/common/LoadingData';
import { fetchGetbyId } from '@/app/[locale]/utils/person/UtilsPerson';
import { useRouter } from 'next/navigation';
import { novedadApiUrl, novedadCreateAsyncApiUrl } from '@/app/api/apiConfig';
import Persona from '@/app/api/models/admin/Persona';
import { fetchByIdProyecto } from '@/app/[locale]/utils/business/tarifario/UtilsTarifario';
import BoxInfo from '@/app/[locale]/components/common/BoxInfo';
import ListNovelty from '@/app/[locale]/components/business/Services/ListNovelty';
import NovedadFormSetion from '@/app/[locale]/components/business/Services/novedades/NovedadFormSection';
import { useFormik } from 'formik';
import { EditAction } from '../../admin/professionals/ProfessionalsActions';
import { RefreshList } from '@/app/api/models/common/ActionsCommon';
function FormNovelty({
  locale,
  idPersona,
  idProyecto,
  listaNovedades,
  idProfesionalProyecto,
}) {
  //========DECLARACION DE VARIABLES ===============
  const t = require(`@/messages/${locale}.json`);
  const [formData, setFormData] = useState(new Novedad());
  const [noveltyTypeOptions, setNoveltyTypeOptions] = useState([]);
  const [perfilOptions, setPerfilOptions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const [data, setData] = useState([]);
  const apiUrls = {
    create: novedadCreateAsyncApiUrl,
    edit: novedadApiUrl,
  };
  //========FIN DECLARACION DE VARIABLES ===============
  //=======SECCION DE USSEFFECT===============
  useEffect(() => {
    fetchGetbyId(idPersona).then((data) => {
      if (data.status && data.status === 404) {
        NotificationSweet({
          title: t.notification.warning.title,
          text: t.Common.notExist,
          type: t.notification.warning.type,
          push: router.push,
          link: '/business/closeServices/search',
        });
        return;
      }
      const persona = new Persona(data);
      const rutElement = document.getElementById('rut');
      const nameElement = document.getElementById('name');
      if (rutElement) {
        rutElement.textContent = persona.perIdNacional || 'N/A';
      }
      if (nameElement) {
        nameElement.textContent = persona.getNombreCompleto() || 'N/A';
      }
    });
  }, []);
  useEffect(() => {
    fetchByIdProyecto(idProyecto).then((res) => {
      if (res.status && res.status === 404) {
        NotificationSweet({
          title: t.notification.warning.title,
          text: t.Common.notExist,
          type: t.notification.warning.type,
          push: router.push,
          link: '/business/closeServices/search',
        });
        return;
      }
      const options = res.data.map((data) => ({
        value: data.perfil.id,
        label: data.perfil.prf_Nombre,
      }));
      setPerfilOptions(options);
      setData([...data, options]);
    });
  }, []);
  //USE EFFECT CONTIENE EL LOANDING
  useEffect(() => {
    fetchNoveltyType().then((data) => {
      const options = data.map((type) => ({
        value: type.id,
        label: type.nombre,
      }));
      setNoveltyTypeOptions(options);
    });
    setLoading(false);
  }, []);
  //=======FIN SECCION DE USSEFFECT===============

  const validationSchema = Novedad.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new Novedad({ idProfesionalProyecto }),
    validationSchema,
    //validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Utiliza una variable para almacenar la función handleFormSubmit
        values.idPersona = idPersona;
        values.idProyecto = idProyecto;
        await handleFormSubmit(values, t, null, false, null, apiUrls);
      } catch (error) {
        console.error('Error in handleFormSubmit:', error);
      } finally {
        RefreshList();
        setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
      }
    },
  });
  if (isLoading) return <LoadingData loadingMessage={t.Common.loadingData} />;
  return (
    <>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <h4>{t.service.noveltyByProfessional}</h4> <br />
        <NovedadFormSetion
          t={t}
          formData={formik.values}
          setFormData={formik.setValues}
          perfilOptions={perfilOptions}
          noveltyTypeOptions={noveltyTypeOptions}
        />
        <div className="d-flex justify-content-end mt-2 mb-2 ">
          <button type="submit" className="btn btn-primary m-2">
            {t.Common.add}
          </button>
          <button
            type="button"
            className="btn btn-danger m-2"
            onClick={() => {
              router.back();
            }}
          >
            {t.Common.goBack}
          </button>
        </div>
      </form>
      <hr />
      <BoxInfo title={t.service.historyNovelty}>
        <ListNovelty
          locale={locale}
          idPersona={idPersona}
          listaNovedades={listaNovedades}
          idProyecto={idProyecto}
        />
      </BoxInfo>
    </>
  );
}

export default FormNovelty;
