"use client";
import React, { useState, useEffect } from "react";
import SelectField from "../common/SelectField";
import fetchCountriest from "@/app/[locale]/utils/country/Countrylist";
import { fechtClients } from "@/app/[locale]/utils/client/ClientFormLogic";
import {
  handleInputChange,
  handleFormSubmit,
  fetchPersonById,
} from "@/app/[locale]/utils/person/UtilsPerson";
import FormEmailCommon from "../admin/email/FormEmailCommon";
import { useRouter } from "next/navigation";
import FormPhoneCommon from "../admin/phone/FormPhoneCommon";
import FormAddressCommon from "../world/address/FormAddressCommon";
import MyDatePicker from "../common/MyDatePicker";
import BoxInfo from "@/app/[locale]/components/common/BoxInfo";
function FormContact({ locale, isEdit, isCreate, idPerson }) {
  const t = require(`@/messages/${locale}.json`);
  const [clientOptions, setClientOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: 0,
    perNombres: "",
    perApellidoPaterno: "",
    perApellidoMaterno: "",
    paiId: 0,
    tpeId: 3,
    birth: "",
    idCliente: 0,
    emails: [],
    telefonos: [],
    direcciones: [],
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
      fetchPersonById(idPerson, t, setFormData, router.push);
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
          <label
            htmlFor="perApellidoPaterno"
            className="col-sm-1 col-form-label"
          >
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
          <label
            htmlFor="perApellidoMaterno"
            className="col-sm-1 col-form-label"
          >
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
        <div className=" mb-3 row align-items-center">
          <label
            htmlFor="perApellidoMaterno"
            className="col-sm-1 col-form-label"
          >
            {t.Common.birthDay}
          </label>
          <div className="col-sm-3">
            <MyDatePicker
              selectedDate={formData.birth}
              onChange={(date) => setFormData({ ...formData, birth: date })}
              title={t.Common.date}
            />
          </div>
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
        <BoxInfo title={t.Common.email} startShow={false}>
        <FormEmailCommon
          t={t}
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
        />
        </BoxInfo>
        <hr />
        <BoxInfo title={t.Account.phone} startShow={false}>
        <FormPhoneCommon
          t={t}
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
        />
        </BoxInfo>
        <hr />
        <BoxInfo title={t.Common.address} startShow={false}>
          <FormAddressCommon
            t={t}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
          />
        </BoxInfo>
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
