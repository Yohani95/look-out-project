"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import { fetchNoveltyType } from "@/app/[locale]/utils/business/Novelty/UtilsNovelType";
import {
  handleInputChange,
  handleSelectChange,
} from "@/app/[locale]/utils/Form/UtilsForm";
import Novedad from "@/app/api/models/proyecto/Novedad";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
function FormNovelty({ locale,idPersona,idProyecto }) {
  const t = require(`@/messages/${locale}.json`);
  const [formData, setFormData] = useState(new Novedad());
  const [noveltyTypeOptions, setNoveltyTypeOptions] = useState([]);
  useEffect(() => {
    fetchNoveltyType().then((data) => {
      const options = data.map((type) => ({
        value: type.id,
        label: type.nombre,
      }));
      setNoveltyTypeOptions(options);
    });
  }, []);
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
          <span type="text" className="form-control" id="rut" />
        </div>
        <label htmlFor="name" className="col-sm-1 col-form-label">
          {t.Common.name}
        </label>
        <div className="col-sm-5">
          <span type="text" className="form-control" id="name" />
        </div>
      </div>
      <hr />
      <div className="mb-3 row align-items-center">
        <SelectField
          label={`${t.service.newRol}`}
          options={noveltyTypeOptions}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, "idTipoNovedad",setFormData)}
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
            onChange={(date) => setFormData({ ...formData, fechaInicio: date })}
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
          <MyDatePicker
            selectedDate={formData.fechaHasta}
            onChange={(date) => setFormData({ ...formData, fechaHasta: date })}
            title={t.Common.date}
          />
        </div>
      </div>
      <div className="mb-3 row align-items-center">
      </div>
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
          />
        </div>
      </div>
      <div className="d-flex justify-content-end mt-2 mb-2 ">
        <button className="btn btn-primary">{t.Common.add}</button>
      </div>
      <hr />
    </>
  );
}

export default FormNovelty;
