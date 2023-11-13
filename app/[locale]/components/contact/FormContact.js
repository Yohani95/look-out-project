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
import FormAddressCommon from "@/app/[locale]/components/world/address/FormAddressCommon";
import MyDatePicker from "../common/MyDatePicker";
import BoxInfo from "@/app/[locale]/components/common/BoxInfo";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import ErroData from "@/app/[locale]/components/common/ErroData";
import Persona from "@/app/api/models/admin/Persona";
import ClientePersona from "@/app/api/models/cuenta/ClientePersona";
import { ClientePersonaApiUrl } from "@/app/api/apiConfig";
import { handleSelectChange } from "../../utils/Form/UtilsForm";
function ContactInfoSection({ t, formData, setFormData, idPerson,setLoading}) {
  const [clientOptions, setClientOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
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
      //if (!idPerson) setLoading(false);
    });
  }, []);
  return (
    <>
      <div className="mb-3 row align-items-center">
        <label htmlFor="persona.perNombres" className="col-sm-1 col-form-label">
          {t.Account.contact_name}
        </label>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            id="persona.perNombres"
            name="persona.perNombres"
            value={formData.persona.perNombres}
            onChange={handleInputChange(formData, setFormData)}
            required
          />
        </div>
        <label
          htmlFor="persona.perApellidoPaterno"
          className="col-sm-1 col-form-label"
        >
          {t.Common.lastName}
        </label>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            id="persona.perApellidoPaterno"
            name="persona.perApellidoPaterno"
            value={formData.persona.perApellidoPaterno}
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
            id="persona.perApellidoMaterno"
            name="persona.perApellidoMaterno"
            value={formData.persona.perApellidoMaterno}
            onChange={handleInputChange(formData, setFormData)}
          />
        </div>
      </div>
      <div className=" mb-3 row align-items-center">
        <label
          htmlFor="persona.perIdNacional"
          className="col-sm-1 col-form-label"
        >
          DNI
        </label>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            id="persona.perIdNacional"
            name="persona.perIdNacional"
            value={formData.persona.perIdNacional}
            onChange={handleInputChange(formData, setFormData)}
          />
        </div>
        <label htmlFor="perApellidoMaterno" className="col-sm-1 col-form-label">
          {t.Common.birthDay}
        </label>
        <div className="col-sm-3">
          <MyDatePicker
            selectedDate={
              formData.persona.perFechaNacimiento != null
                ? new Date(formData.persona.perFechaNacimiento)
                : null
            }
            onChange={(date) => {
              setFormData((prevData) => ({
                ...prevData,
                persona: {
                  ...prevData.persona,
                  perFechaNacimiento: date,
                },
              }));
            }}
            title={t.Common.date}
          />
        </div>
        <SelectField
          label={t.Account.country}
          options={countryOptions}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => {
            setFormData((prevData) => ({
              ...prevData,
              persona: {
                ...prevData.persona,
                paiId: e.target.value,
              },
            }));
          }}
          selectedValue={formData.persona.paiId}
        />
      </div>
      <div className=" mb-3 row align-items-center">
        <SelectField
          label={t.Common.account}
          options={clientOptions}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, "idCliente", setFormData)}
          selectedValue={formData.idCliente}
        />
      </div>
    </>
  );
}

function EmailSection({ t, formData, setFormData, idPerson }) {
  return (
    <BoxInfo title={t.Common.email} startShow={false}>
      <FormEmailCommon
        t={t}
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
        idPersona={idPerson}
      />
    </BoxInfo>
  );
}

function PhoneSection({ t, formData, setFormData, idPerson }) {
  return (
    <BoxInfo title={t.Account.phone} startShow={false}>
      <FormPhoneCommon
        t={t}
        formData={formData}
        setFormData={setFormData}
        idPersona={idPerson}
      />
    </BoxInfo>
  );
}

function AddressSection({ t, formData, setFormData, idPerson }) {
  return (
    <BoxInfo title={t.Common.address} startShow={false}>
      <FormAddressCommon
        t={t}
        formData={formData}
        setFormData={setFormData}
        idPersona={idPerson}
      />
    </BoxInfo>
  );
}
function FormContact({ locale, isEdit, isCreate, idPerson, idClient }) {
  //========DECLARACION DE VARIABLES ===============
  const t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const [formData, setFormData] = useState({
    persona: new Persona(),
    clientePersona: new ClientePersona(),
    idCliente: 0,
    emails: [],
    telefonos: [],
    direcciones: [],
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //========FIN DECLARACION DE VARIABLES ===============

  //=======SECCION DE USSEFFECT===============
  if (idPerson != null && !isNaN(idPerson)) {
    useEffect(() => {
      fetchPersonById(idPerson, t, setFormData, router.push)
        .then(async () => {
          const result = await fetch(`${ClientePersonaApiUrl}`);
          var cliPer = await result.json();
          const filteredData = cliPer.find(
            (p) => p.cliId == idClient && p.perId == idPerson
          );
          console.log(filteredData)
          setFormData((prevData) => ({
            ...prevData,
            clientePersona: filteredData,
            idCliente: filteredData.cliId,
          }));
        })
        .then(() => {
          setLoading(false);
        });
      // Coloca aquí cualquier otra lógica que necesite ejecutarse después de FillClient
    }, [idPerson]);
  }
  //=======FIN SECCION DE USSEFFECT===============
  const handleSubmit = handleFormSubmit(
    formData,
    t,
    router.push,
    isEdit,
    setFormData
  );
  const cancel = () => {
    router.back();
  };
  // useEffect(() => {

  //   console.log(formData)
  // }, [formData]);
  if (isLoading) return <LoadingData loadingMessage={t.Common.loadingData} />;
  if (error) return <ErroData message={t.Common.errorMsg} />;
  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={!isCreate && !isEdit ? true : false}>
        {isCreate || isEdit ? (
          <h4>{isEdit ? t.Account.edit : t.Nav.contacts.create}</h4>
        ) : (
          <h4>{t.Common.account}</h4>
        )}
        <ContactInfoSection
          t={t}
          formData={formData}
          setFormData={setFormData}
          idPerson={idPerson}
        />

        <EmailSection
          t={t}
          formData={formData}
          setFormData={setFormData}
          idPerson={idPerson}
        />

        <hr />
        <PhoneSection
          t={t}
          formData={formData}
          setFormData={setFormData}
          idPerson={idPerson}
        />
        <hr />
        <AddressSection
          t={t}
          formData={formData}
          setFormData={setFormData}
          idPerson={idPerson}
        />
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
