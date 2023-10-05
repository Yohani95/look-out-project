"use client";
import React, { useState, useEffect } from "react";
import SelectField from "../common/SelectField";
import fetchCountriest from "@/app/[locale]/utils/country/Countrylist";
import { fechtClients } from "@/app/[locale]/utils/client/ClientFormLogic";
import { handleInputChange,handleFormSubmit,fetchPersonById } from "@/app/[locale]/utils/person/UtilsPerson";
import { useRouter } from "next/navigation";
function FormContact({ locale, isEdit, isCreate,idPerson }) {
  const t = require(`@/messages/${locale}.json`);
  const [clientOptions, setClientOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const router = useRouter();
  const [formData, setFormData] = useState({
    id:0,
    perNombres: "",
    perApellidoPaterno: "",
    perApellidoMaterno: "",
    paiId: 0,
    tpeId: 3,
    idCliente: 0,
  });
  const FillClient = async () => {
    try {
      const datos = await fechtClients();
      const options = datos.map((sector) => ({
        value: sector.cliId,
        label: sector.cliNombre,
      }));
      setClientOptions(options);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    FillClient();
  }, []);
  useEffect(() => {
    fetchCountriest().then((data) => {
      const options = data.map((country) => ({
        value: country.paiId,
        label: country.paiNombre,
      }));
      setCountryOptions(options);
    });
  }, []);
  if (idPerson != null && !isNaN(idPerson)) {
    useEffect(() => {
      fetchPersonById(idPerson,t,setFormData,router.push);
    }, [idPerson]);
  }

  const handleSubmit = handleFormSubmit(
    formData,
    t,
    router.push,
    isEdit,
    setFormData
  );

  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    // console.log(`Selected ${fieldName}:`, selectedValue);
    setFormData((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
  };
  const cancel = () => {
    router.back();
  };
  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={!isCreate && !isEdit ? true : false}>
      {isCreate || isEdit ? (
          <h4>{isEdit ? t.Account.edit : t.Nav.contacts.create}</h4>
        ) : (
          <h4>{t.Common.account}</h4>
        )}
      <div className="mb-3 row align-items-center">
        <label htmlFor="perNombres" className="col-sm-1 col-form-label">
          {t.Account.contact_name}
        </label>
        <div className="col-sm-3">
          <input  
            type="text"
            className="form-control"
            id="perNombres"
            name="perNombres"
            value={formData.perNombres}
            onChange={handleInputChange(formData, setFormData)}
            required
          />
        </div>
        <label htmlFor="perApellidoPaterno" className="col-sm-1 col-form-label">
          {t.Common.lastName}
        </label>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            id="perApellidoPaterno"
            name="perApellidoPaterno"
            value={formData.perApellidoPaterno}
            onChange={handleInputChange(formData, setFormData)}
            required
          />
        </div>
        <label htmlFor="perApellidoMaterno" className="col-sm-1 col-form-label">
          {t.Common.secondName}
        </label>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            id="perApellidoMaterno"
            name="perApellidoMaterno"
            value={formData.perApellidoMaterno}
            onChange={handleInputChange(formData, setFormData)}
          />
        </div>
      </div>
      {/* <div className=" mb-3 row align-items-center">
        <label htmlFor="position" className="col-sm-2 col-form-label">
          {t.Account.position}
        </label>
        <div className="col-sm-4">
          <input type="text" className="form-control" id="position" />
        </div>
        <label htmlFor="phone1" className="col-sm-2 col-form-label">
          {t.Account.phone} 1
        </label>
        <div className="col-sm-4">
          <input type="text" className="form-control" id="phone1" />
        </div>
      </div> */}
      <div className=" mb-3 row align-items-center">
        <SelectField
          label={t.Account.country}
          options={countryOptions}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, "paiId")}
          selectedValue={formData.paiId}
        />
        <SelectField
          label={t.Common.account}
          options={clientOptions}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, "idCliente")}
          selectedValue={formData.idCliente}
        />
      </div>
      {/* <div className=" mb-3 row align-items-center">
        <label  className="col-sm-2 col-form-label">
          {t.Ficha.table.contacts.rol}
        </label>
        <div className="col-sm-4">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option1"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              {t.Common.decisor}
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="option2"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              {t.Common.influencer}
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input cursor-point"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value="option3"
            />
            <label className="form-check-label" htmlFor="inlineRadio3">
              {t.Common.other}
            </label>
          </div>
          
        </div>
        <label htmlFor="email" className="col-sm-2 col-form-label">
          {t.Account.Email}
        </label>
        <div className="col-sm-4">
          <input type="text" className="form-control" id="email" name="email" />
        </div>
      </div> */}
       </fieldset>
      <div className="d-flex justify-content-end mb-3">
        {isCreate || isEdit ? (
          <button type="submit" className="btn btn-primary m-2">
            {isEdit ? t.Common.edit : t.Common.saveButton}
          </button>
        ) : (
          <></>
        )}
        <button type="button" className="btn btn-danger m-2" onClick={cancel}>
          {isCreate ? t.Common.cancel : t.Common.goBack}
        </button>
      </div>
    </form>
  );
}

export default FormContact;
