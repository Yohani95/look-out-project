"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import fetchCountriest from "../../utils/country/Countrylist";
import fetchSectorComerciales from "../../utils/CommercialPlace/list";
import { fetchPerson } from "@/app/[locale]/utils/person/UtilsPerson";
import { fetchComuna } from "@/app/[locale]/utils/comuna/utilsComuna";
import { fetchGiro } from "@/app/[locale]/utils/giro/UtilsGiro";
import { fetchEstadoCliente } from "@/app/[locale]/utils/EstadoCliente/UtilsEstadoCliente";
import {
  handleClientInputChange,
  handleClientFormSubmit,
} from "../../utils/client/ClientFormLogic";
function Form({ locale }) {
  let t;
  t = require(`@/messages/${locale}.json`);
  const [countryOptions, setCountryOptions] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);
  const [KamOptions, setKamOptions] = useState([]);
  const [giroOptions, setGiroOptions] = useState([]);
  const [estadoOptions, setEstadoOptions] = useState([]);
  const [formData, setFormData] = useState({
    cliNombre: "",
    cliDescripcion: "",
    eclId: 0,
    paiId: 0,
    secId: 0,
    girId: 0,
    cliSitioWeb: "",
    cliNif: "",
  });
  useEffect(() => {
    fetchCountriest().then((data) => {
      const options = data.map((country) => ({
        value: country.paiId,
        label: country.paiNombre,
      }));
      setCountryOptions(options);
    });
  }, []);
  useEffect(() => {
    fetchPerson().then((data) => {
      const options = data.map((kam) => ({
        value: kam.id,
        label: kam.perNombres + " " + kam.perApellidoPaterno,
      }));
      setKamOptions(options);
    });
  }, []);
  useEffect(() => {
    fetchSectorComerciales().then((data) => {
      console.log("Sector comercial"+data)
      const options = data.map((sector) => ({
        value: sector.secId,
        label: sector.secNombre,
      }));
      setSectorOptions(options);
    });
  }, []);
  useEffect(() => {
    fetchGiro().then((data) => {
      const options = data.map((sector) => ({
        value: sector.girId,
        label: sector.girNombre,
      }));
      setGiroOptions(options);
    });
  }, []);
  
  useEffect(() => {
    fetchEstadoCliente().then((data) => {
      const options = data.map((sector) => ({
        value: sector.eclId,
        label: sector.eclNombre,
      }));
      setEstadoOptions(options);
    });
  }, []);
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    console.log(`Selected ${fieldName}:`, selectedValue);
    setFormData((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    // const success = await submitClient(formData);
    // if (success) {
    //   // Lógica adicional después de la creación exitosa
    // } else {
    //   // Lógica de manejo de error
    // }
  };
  return (
    <div className="card-body">
      <div className="d-flex justify-content-end mb-3">
        <button type="button" className="btn btn-primary me-2">
          {t.Account.button.see_relations}
        </button>
        <button type="button" className="btn btn-secondary me-2">
          {t.Account.button.Modify}
        </button>
        <button type="button" className="btn btn-danger">
          {t.Account.button.delete}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row align-items-center">
          <label htmlFor="cliNombre" className="col-sm-1 col-form-label">
            {t.Account.name}
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="cliNombre"
              name="cliNombre"
              value={formData.cliNombre}
              onChange={handleClientInputChange(formData, setFormData)}
            />
          </div>
          <label htmlFor="cliDescripcion" className="col-sm-1 col-form-label">
            {t.Common.description}
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="cliDescripcion"
              name="cliDescripcion"
              value={formData.cliDescripcion}
              onChange={handleClientInputChange(formData, setFormData)}
            />
          </div>
          <label htmlFor="cliNif" className="col-sm-1 col-form-label">
            {t.Account.nif}
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              name="cliNif"
              id="cliNif"
              value={formData.cliNif}
              onChange={handleClientInputChange(formData, setFormData)}
            />
          </div>
        </div>
        <div className="mb-3 row align-items-center">
        <SelectField
            label={t.Common.giro}
            options={giroOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
            onChange={(e) => handleSelectChange(e, "girId")}
          />
          <SelectField
            label={t.Account.place}
            options={sectorOptions}
            labelClassName="col-sm-1 col-form-label"
            preOption={t.Account.select}
            divClassName="col-sm-3"
            onChange={(e) => handleSelectChange(e, "secId")}
          />
          <SelectField
            label={t.Account.KAM}
            options={KamOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
            onChange={(e) => handleSelectChange(e, "perId")}
          />
        </div>
        <div className="mb-3 row align-items-center">
          <SelectField
            label={t.Account.status}
            options={estadoOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
            onChange={(e) => handleSelectChange(e, "eclId")}
          />
                   <SelectField
            label={t.Account.country}
            options={countryOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
            onChange={(e) => handleSelectChange(e, "paiId")}
          />
          <label htmlFor="cliSitioWeb" className="col-sm-1 col-form-label">
            {t.Account.web}
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="cliSitioWeb"
              name="cliSitioWeb"
              value={formData.cliSitioWeb}
              onChange={handleClientInputChange(formData, setFormData)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary me-2">
          test submit
        </button>
      </form>
      <hr />
    </div>
  );
}

export default Form;
