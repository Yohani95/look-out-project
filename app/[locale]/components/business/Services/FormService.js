"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import { fechtClients } from "@/app/[locale]/utils/client/ClientFormLogic";
import SelectField from "@/app/[locale]/components/common/SelectField";
import fetchCountriest from "@/app/[locale]/utils/country/Countrylist";
import {fetchTypeService } from "@/app/[locale]/utils/project/tipoServicio/UtilsTypeService"
import {fetchPersonGetbyIdClient} from "@/app/[locale]/utils/person/UtilsPerson"
import { useSession, signOut } from "next-auth/react";
function FormService({ locale }) {
  const [countryOptions, setCountryOptions] = useState([]);
  const [typeServiceOptions, setTypeServiceOptions] = useState([]);
  const [contactOptions, setContactOptions] = useState([]);
  const [accountOptions, setAccountOptions] = useState([]);
  const [formData, setFormData] = useState({
     cliId: 0,
    // cliDescripcion: "",
    // eclId: 0,
    // paiId: 0,
    // secId: 0,
    // girId: 0,
    // cliSitioWeb: "",
    // cliNif: "",
    // idPerson: [],
    perId:0,
    tseId:0,
    paiId:0,
    kamId: 0
  });
  let t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const { data: session, status } = useSession();
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
    fetchTypeService().then((data) => {
      const options = data.map((item) => ({
        value: item.tseId,
        label: item.tseNombre,
      }));
      setTypeServiceOptions(options);
    });
  }, []);
  const FillClient = async () => {
    try {
      const datos = await fechtClients();
      const options = datos.map((item) => ({
        value: item.cliId,
        label: item.cliNombre,
      }));
      setAccountOptions(options);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    FillClient();
  }, []);
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    //console.log(`Selected ${fieldName}:`, selectedValue);
    setFormData((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
    if(fieldName=="cliId"){
      fetchPersonGetbyIdClient(selectedValue).then((person) => {
        const options = person.data.map((item) => ({
          value: item.id,
          label: item.perNombres +' '+item.perApellidoPaterno,
        }));
        setContactOptions(options);
      });
    }
  };
  const cancel = () => {
    router.push("/");
  };
  const goContactCreate = () => {
    router.push("/contact/create");
  };
  return (
    <>
      <div className="d-flex justify-content-end mt-2">
        <div className="col-sm-2">
          <h6 className="text-end ">ID {t.business.title} 12345678</h6>
        </div>
      </div>
      <div className="mt-3">
        <div className="mb-3 row align-items-center">
          <label htmlFor="accountName" className="col-sm-1 col-form-label">
            {t.Account.KAM}
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="accountName"
              value={`${session.user.persona.perNombres} ${session.user.persona.perApellidoPaterno}`}
              disabled
            />
          </div>
          <label htmlFor="accountName" className="col-sm-2 col-form-label">
            {t.Ficha.table.business.dateEnd}
          </label>
          <div className="col-sm-3">
            <MyDatePicker />
          </div>
          <SelectField
            label={t.Account.country}
            options={countryOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-2"
            onChange={(e) => handleSelectChange(e, "paiId")}
            selectedValue={formData.paiId}
          />
        </div>

        <div className=" mb-3 row align-items-center">
          <SelectField
            label={t.Account.name}
            options={accountOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
            onChange={(e) => handleSelectChange(e, "cliId")}
            selectedValue={formData.cliId}
          />
          <div className="col-sm-2">
            <button type="button" className="badge btn btn-primary">
              {t.Common.request} (+){" "}
            </button>
          </div>
          <label htmlFor="business_name" className="col-sm-1 col-form-label">
            {t.Account.business_name}
          </label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="business_name" />
          </div>
        </div>

        <div className=" mb-3 row align-items-center">
          <SelectField
            label={t.Common.contact}
            options={contactOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
            onChange={(e) => handleSelectChange(e, "perId")}
            selectedValue={formData.perId}
          />
          <div className="col-sm-2">
            <button type="button" className="badge btn btn-primary" onClick={goContactCreate}>
              {t.Common.add} (+)
            </button>
          </div>
          <SelectField
            label={`${t.Account.type} ${t.Account.business}`}
            options={typeServiceOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
            onChange={(e) => handleSelectChange(e, "tseId")}
            selectedValue={formData.tseId}
          />
        </div>

        <div className=" mb-3 row align-items-center">
          <label htmlFor="confirmclient" className="col-sm-1 col-form-label">
            {t.Common.confirm} {t.Common.client}
          </label>
          <div className="col-sm-3">
            <input
              type="text disable"
              className="form-control"
              id="confirmclient"
              disabled
            />
          </div>
          <div className="col-sm-2">
            <button type="button" className="badge btn btn-success">
              {t.Common.uploadFile}
            </button>
          </div>
          <label htmlFor="proposal" className="col-sm-1 col-form-label">
            {t.Common.proposal} {t.Common.accepted}
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="proposal"
              disabled
            />
          </div>
          <div className="col-sm-2">
            <button type="button" className="badge btn btn-success">
              {t.Common.uploadFile}
            </button>
          </div>
        </div>
        <hr />

        <div className="mb-3 row align-items-center">
          <label
            htmlFor="estimatedStartDate"
            className="col-sm-1 col-form-label"
          >
            {t.business.estimatedStartDate}
          </label>
          <div className="col-sm-2">
            <MyDatePicker />
          </div>
          <label htmlFor="estimatedTerm" className="col-sm-1 col-form-label">
            {t.business.estimatedTerm}
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" id="estimatedTerm" />
          </div>
          <div className="col-sm-2">
            {/* <select className="form-control form-select">
              <option value="">{t.Account.select}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select> */}
          </div>
          <label
            htmlFor="estimatedClosingDate"
            className="col-sm-2 col-form-label"
          >
            {t.business.estimatedClosingDate}
          </label>
          <div className="col-sm-2">
            <input
              type="text"
              className="form-control"
              id="estimatedClosingDate"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mb-2 row d-flex justify-content-end">
        <div className="col-sm-1">
          <button className="text-end badge btn btn-primary">
            {t.Common.include} ...{" "}
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-2 mb-2">
        <div className="col-sm-2">
          <button className="btn btn-primary">{t.Common.saveDraf}</button>
        </div>
        <div className="col-sm-2">
          <button className="btn btn-primary">{t.business.saveClosing}</button>
        </div>
      </div>
    </>
  );
}
export default FormService;
