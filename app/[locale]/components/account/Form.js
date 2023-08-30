"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import fetchCountriest from "../../utils/country/Countrylist";
import fetchSectorComerciales from "../../utils/CommercialPlace/list";
import { fetchPerson } from "@/app/[locale]/utils/person/UtilsPerson";
import { fetchComuna } from "@/app/[locale]/utils/comuna/utilsComuna";
import { fetchGiro } from "@/app/[locale]/utils/giro/UtilsGiro";
import { fetchEstadoCliente } from "@/app/[locale]/utils/EstadoCliente/UtilsEstadoCliente";
import ContactList from "@/app/[locale]/components/contact/ContactList";
import { useRouter } from "next/navigation";
import {clientApiUrl,clientWithContactApiUrl} from "@/app/api/apiConfig"
import {
  handleClientInputChange,
  handleClientFormSubmit,
  fetchGetbyId
} from "../../utils/client/ClientFormLogic";
function Form({ locale, isEdit, idPerson }) {
  let t;
  t = require(`@/messages/${locale}.json`);
  const [countryOptions, setCountryOptions] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);
  const [KamOptions, setKamOptions] = useState([]);
  const [giroOptions, setGiroOptions] = useState([]);
  const [estadoOptions, setEstadoOptions] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState([]); // Estado para el ID seleccionado
  const [selectedIds, setSelectedIds] = useState([]); 
  const [formData, setFormData] = useState({
    cliNombre: "",
    cliDescripcion: "",
    eclId: 0,
    paiId: 0,
    secId: 0,
    girId: 0,
    cliSitioWeb: "",
    cliNif: "",
    idPerson: [],
  });
  const router = useRouter();
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      idPerson: selectedIds,
    }));
  }, [selectedIds])
  const handleCheckboxChange = (itemId) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(itemId)) {
        return prevSelectedIds.filter(id => id !== itemId);
      } else {
        return [...prevSelectedIds, itemId];
      }
    });
    setFormData((prevFormData) => ({
      ...prevFormData,
      idPerson: selectedIds,
    }));
  };
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
  if (idPerson != null && !isNaN(idPerson)) {
    useEffect(() => {
      // Realiza una llamada API para obtener los datos del usuario por su ID
      // y actualiza el estado formData con los datos obtenidos
      fetchclientData(idPerson);
    }, [idPerson]);
  }
  
  const fetchclientData = async (Id) => {
    try {
      const response = await fetchGetbyId(Id)
      if (response.ok) {
        const data = await response.json();
        setFormData(data); // Actualiza el estado formData con los datos obtenidos
  
        // Hacer la segunda llamada para obtener los datos adicionales
        const response2 = await fetch(
          `${clientWithContactApiUrl}/${Id}`
        );
        if (response2.ok) {
          const data2 = await response2.json();
          data.idPerson = data2.data; // Agrega los valores válidos
          setSelectedIds(data.idPerson);
        } else {
          // Manejar el error de la segunda llamada si es necesario
        }
      } else if (response.status == 404) {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.Common.notExist,
          type: translations.notification.warning.type,
          push: router.push,
          link: "/admin/user/list",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      NotificationSweet({
        title: translations.notification.warning.title,
        text: translations.Common.notExist,
        type: translations.notification.warning.type,
        push: router.push,
        link: "/admin/user/list",
      });
    }
  };
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    console.log(`Selected ${fieldName}:`, selectedValue);
    setFormData((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
  };
  const handleSubmit = handleClientFormSubmit(formData, t, router.push, isEdit,setFormData);
  const cancel = () => {
    router.push("/account/search");
  };
  return (
    <>
      <div className="card-body">
        {/* {!isEdit && (
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
        )} */}
        <h4>{isEdit ? t.Account.edit : t.Account.title}</h4>
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
                required
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
                required
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
                required
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
              selectedValue={formData.girId}
            />
            <SelectField
              label={t.Account.place}
              options={sectorOptions}
              labelClassName="col-sm-1 col-form-label"
              preOption={t.Account.select}
              divClassName="col-sm-3"
              onChange={(e) => handleSelectChange(e, "secId")}
              selectedValue={formData.secId}
            />
            <SelectField
              label={t.Account.KAM}
              options={KamOptions}
              preOption={t.Account.select}
              labelClassName="col-sm-1 col-form-label"
              divClassName="col-sm-3"
              onChange={(e) => handleSelectChange(e, "perId")}
              //selectedValue={formData.idPerson}
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
              selectedValue={formData.eclId}
            />
            <SelectField
              label={t.Account.country}
              options={countryOptions}
              preOption={t.Account.select}
              labelClassName="col-sm-1 col-form-label"
              divClassName="col-sm-3"
              onChange={(e) => handleSelectChange(e, "paiId")}
              selectedValue={formData.paiId}
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
                required
              />
            </div>
          </div>
          <hr className="mt-5" />
          <div className="mt-5">
            <ContactList
              locale={locale}
              onRadioChange={handleCheckboxChange}
              idPersons={selectedIds}
            />
          </div>
          <div className="d-flex justify-content-end mb-3">
            <button type="submit" className="btn btn-primary m-2">
              {isEdit ? t.Common.edit : t.Common.saveButton}
            </button>
            <button
              type="button"
              className="btn btn-danger m-2"
              onClick={cancel}
            >
              {t.Common.cancel}
            </button>
          </div>
        </form>
        <hr />
      </div>
    </>
  );
}

export default Form;
