"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import { fetchNoveltyType } from "@/app/[locale]/utils/business/Novelty/UtilsNovelType";
import {
  handleInputChange,
  handleSelectChange,
  handleFormSubmit,
} from "@/app/[locale]/utils/Form/UtilsForm";
import Novedad from "@/app/api/models/proyecto/Novedad";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import { fetchGetbyId } from "@/app/[locale]/utils/person/UtilsPerson";
import { useRouter } from "next/navigation";
import { novedadApiUrl } from "@/app/api/apiConfig";
import Persona from "@/app/api/models/admin/Persona";
import { fetchByIdProyecto } from "@/app/[locale]/utils/business/tarifario/UtilsTarifario";
import { Constantes } from "@/app/api/models/common/Constantes";
function FormNovelty({ locale, idPersona, idProyecto }) {
  //========DECLARACION DE VARIABLES ===============
  const t = require(`@/messages/${locale}.json`);
  const [formData, setFormData] = useState(new Novedad());
  const [noveltyTypeOptions, setNoveltyTypeOptions] = useState([]);
  const [perfilOptions, setPerfilOptions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [dateStatus, setdateStatus] = useState(true);
  const [perfilStatus, setPerfilStatus] = useState(true);
  formData.idPersona = idPersona;
  formData.idProyecto = idProyecto;
  const router = useRouter();
  const constantes = new Constantes();
  const redirectLink = "/business/closeServices";
  const apiUrls = {
    create: novedadApiUrl,
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
          link: "/business/closeServices/search",
        });
        return;
      }
      const persona = new Persona(data);
      console.log(persona);
      formData.IdPerfil = persona.tpeId;
      const rutElement = document.getElementById("rut");
      const nameElement = document.getElementById("name");
      if (rutElement) {
        rutElement.textContent = persona.perIdNacional || "N/A";
      }
      if (nameElement) {
        nameElement.textContent = persona.getNombreCompleto() || "N/A";
      }
    });
  }, []);
  useEffect(() => {
    fetchByIdProyecto(idProyecto).then((res) => {
      const options = res.data.map((data) => ({
        value: data.perfil.id,
        label: data.perfil.prf_Nombre,
      }));
      setPerfilOptions(options);
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
  useEffect(() => {
    if (
      formData.idTipoNovedad == constantes.TipoNovedad.LICENCIA_MEDICA ||
      formData.idTipoNovedad == constantes.TipoNovedad.VACACIONES
    ) {
      setdateStatus(false);
    } else {
      setdateStatus(true);
    }
    if (formData.idTipoNovedad == constantes.TipoNovedad.CAMBIO_PERFIL) {
      setPerfilStatus(false);
    } else {
      setPerfilStatus(true);
    }
    console.log(formData);
  }, [formData.idTipoNovedad]);
  //=======FIN SECCION DE USSEFFECT===============

  const submit = handleFormSubmit(
    formData,
    t,
    router.push,
    false,
    redirectLink,
    apiUrls
  );
  if (isLoading) return <LoadingData loadingMessage={t.Common.loadingData} />;
  return (
    <>
      <h4>{t.service.noveltyByProfessional}</h4> <br />
      <div className="mb-3 row align-items-center">
        <label
          htmlFor="estimatedClosingDate"
          className="col-sm-1 col-form-label"
        >
          {t.Common.rut}
        </label>
        <div className="col-sm-5">
          <span type="text" className="form-control" id="rut" value="test" />
        </div>
        <label htmlFor="name" className="col-sm-1 col-form-label">
          {t.Common.name}
        </label>
        <div className="col-sm-5">
          <span type="text" className="form-control" id="name" />
        </div>
      </div>
      <hr />
      <form onSubmit={submit}>
        <div className="mb-3 row align-items-center">
          <SelectField
            label={`${t.service.noveltyType}`}
            options={noveltyTypeOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
            onChange={(e) =>
              handleSelectChange(e, "idTipoNovedad", setFormData)
            }
            selectedValue={formData.idTipoNovedad}
          />
        </div>
        <div className="mb-3 row align-items-center">
          <label
            htmlFor="estimatedClosingDate"
            className="col-sm-1 col-form-label"
          >
            {t.service.noveltyDate}
          </label>
          <div className="col-sm-5">
            <MyDatePicker
              selectedDate={formData.fechaInicio}
              onChange={(date) =>
                setFormData({ ...formData, fechaInicio: date })
              }
              title={t.Common.date}
            />
          </div>
          <label
            htmlFor="estimatedClosingDate"
            className="col-sm-1 col-form-label"
          >
            {t.service.dateTo}
          </label>

          <div className="col-sm-5">
            <fieldset disabled={dateStatus}>
              <MyDatePicker
                selectedDate={formData.fechaHasta}
                onChange={(date) =>
                  setFormData({ ...formData, fechaHasta: date })
                }
                title={t.Common.date}
              />
            </fieldset>
          </div>
        </div>
        <fieldset disabled={perfilStatus}>
          <div className="mb-3 row align-items-center">
            <SelectField
              label={`${t.service.newRol}`}
              options={perfilOptions}
              preOption={t.Account.select}
              labelClassName="col-sm-1 col-form-label"
              divClassName="col-sm-3"
              onChange={(e) => handleSelectChange(e, "IdPerfil", setFormData)}
              selectedValue={formData.IdPerfil}
            />
          </div>
        </fieldset>
        <div className="mb-3 row align-items-center">
          <label htmlFor="observacion" className="col-sm-1 col-form-label">
            {t.Common.observations}
          </label>
          <div className="col-sm-11">
            <textarea
              type="text-area"
              className="form-control"
              id=""
              value={formData.observaciones}
              onChange={handleInputChange(formData, setFormData)}
              required
            />
          </div>
        </div>
        <div className="d-flex justify-content-end mt-2 mb-2 ">
        <button className="btn btn-danger" onClick={()=>{router.back()}}>{t.Common.back}</button>
          <button className="btn btn-primary">{t.Common.add}</button>
        </div>
      </form>
      <hr />
    </>
  );
}

export default FormNovelty;
