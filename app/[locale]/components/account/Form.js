"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import fetchCountriest from "../../utils/country/Countrylist";
import fetchSectorComerciales from "../../utils/CommercialPlace/list";
import {
  handleClientInputChange,
  handleClientFormSubmit,
} from "../../utils/client/ClientFormLogic";
function Form({ locale }) {
  let t;
  t = require(`@/messages/${locale}.json`);
  const [countryOptions, setCountryOptions] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);
  const [formData, setFormData] = useState({
    cliNombre: "",
    cliDescripcion: "",
    eclId: 0,
    paiId: 0,
    secId: 0,
    girId: 0,
    cliSitioWeb: "",
  });
  useEffect(() => {
    // Usa la función fetchCountries para obtener los datos de la API
    fetchCountriest().then((data) => {
      const options = data.map((country) => ({
        value: country.paiId,
        label: country.paiNombre,
      }));
      setCountryOptions(options); // Actualiza las opciones de países
    });
  }, []);

  useEffect(() => {
    // Usa la función fetchSectorComerciales para obtener los datos de sectores comerciales
    fetchSectorComerciales().then((data) => {
      const options = data.map((sector) => ({
        value: sector.secId,
        label: sector.secNombre,
      }));
      setSectorOptions(options); // Actualiza las opciones de sectores comerciales
    });
  }, []);
  const nifOptions = [
    { value: "optionA", label: "option1" },
    { value: "optionB", label: "option2" },
    // Agrega más opciones según sea necesario
  ];

  const placeOptions = [
    { value: "optionP", label: "Carlos Sylva" },
    { value: "optionQ", label: "Miguel Melendez" },
    { value: "option1", label: "Cersar Rozas" },
    { value: "option2", label: "Rodrigo Rohland" },
    // Agrega más opciones según sea necesario
  ];
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    console.log(`Selected ${fieldName}:`, selectedValue);
    setFormData((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
  };
//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
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
          <label htmlFor="cliNombre" className="col-sm-2 col-form-label">
            {t.Account.name}
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="cliNombre"
              name="cliNombre"
              value={formData.cliNombre}
              onChange={handleClientInputChange(formData, setFormData)}
            />
          </div>
          <SelectField
            label={t.Account.country}
            options={countryOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-2 col-form-label"
            divClassName="col-sm-4"
            onChange={(e) => handleSelectChange(e, "paiId")}
          />
        </div>

        <div className="mb-3 row align-items-center">
          <SelectField
            label={t.Account.main_account}
            labelClassName="col-sm-2 col-form-label"
            divClassName="col-sm-4"
            preOption={t.Account.select}
            options={nifOptions}
          />
        </div>

        <div className="mb-3 row align-items-center">
          <label htmlFor="nif" className="col-sm-1 col-form-label">
            {t.Account.nif}
          </label>
          <div className="col-sm-3">
            <input type="text" className="form-control" id="nif" />
          </div>
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
            options={placeOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
          />
        </div>

        <div className="mb-3 row align-items-center">
          <label htmlFor="address" className="col-sm-2 col-form-label">
            {t.Account.address}
          </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="address" />
          </div>
          <label htmlFor="status" className="col-sm-2 col-form-label">
            {t.Account.status}
          </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="status" />
          </div>
        </div>

        <div className="mb-3 row align-items-center">
          <label htmlFor="city" className="col-sm-1 col-form-label">
            {t.Account.city}
          </label>
          <div className="col-sm-3">
            <input type="text" className="form-control" id="city" />
          </div>
          <label htmlFor="web" className="col-sm-1 col-form-label">
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
          <label htmlFor="phone" className="col-sm-1 col-form-label">
            {t.Account.phone}
          </label>
          <div className="col-sm-3">
            <input type="text" className="form-control" id="phone" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary me-2">
                submit
              </button>
      </form>
      <hr />
    </div>
  );
}

export default Form;
