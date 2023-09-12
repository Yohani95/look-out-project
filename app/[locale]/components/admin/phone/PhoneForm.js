"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import { useRouter } from "next/navigation";
import {
  handleInputChange,
  handleFormSubmit,
  fetchPhoneType,
} from "@/app/[locale]/utils/phone/UtilsPhone";
import { fetchPersonByContact } from "@/app/[locale]/utils/person/UtilsPerson";
function FormPhone({ locale, isEdit, isCreate, idPhone }) {
  const router = useRouter();
  const [emaOptions, setEmaOptions] = useState([]);
  const [personOptions, setpersonOptions] = useState([]);
  const [formData, setFormData] = useState({
    telId: 0,
    CliId: "",
    PerId: 0,
    TelNumero: "",
    TteId: 0,
    TelVigente: 0,
  });
  const t = require(`@/messages/${locale}.json`);
  useEffect(() => {
    fetchPhoneType().then((data) => {
      const options = data.data.map((item) => ({
        value: item.temId,
        label: item.temNombre,
      }));
      ssetEmaOptions(options);
    });
  }, []);
  useEffect(() => {
    fetchPersonByContact().then((data) => {
      const options = data.map((person) => ({
        value: person.id,
        label: person.perNombres + " " + person.perApellidoPaterno,
      }));
      setpersonOptions(options);
    });
  }, []);
  const cancel = () => {
    router.push("/admin/phone/search");
  };
  const handleSubmit = handleFormSubmit(
    formData,
    t,
    router.push,
    isEdit,
    setFormData
  );
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    setFormData((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={!isCreate && !isEdit ? true : false}>
        {isCreate || isEdit ? (
          <h4>
            {isEdit ? t.Common.edit : `${t.Common.create} ${t.Common.phone}`}
          </h4>
        ) : (
          <h4>{t.Account.phone}</h4>
        )}{" "}
        <div className="mb-3 row align-items-center">
          <label htmlFor="TelNumero" className="col-sm-2 col-form-label">
            {t.Account.phone}
          </label>
          <div className="col-sm-4">
            <input
              type="number"
              className="form-control"
              id="TelNumero"
              name="TelNumero"
              value={formData.TelNumero}
              onChange={handleInputChange(formData, setFormData)}
              title={t.Common.invalidPhoneNumber}
              pattern="[0-9]{9}"
              required
            />
          </div>
          <SelectField
            label={`${t.Common.contact}`}
            options={personOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-2 col-form-label"
            divClassName="col-sm-4"
            onChange={(e) => handleSelectChange(e, "PerId")}
            selectedValue={formData.PerId}
          />
        </div>
        <div className=" mb-3 row align-items-center">
          <SelectField
            label={`${t.Account.type} ${t.Account.phone}`}
            options={phoneOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-2 col-form-label"
            divClassName="col-sm-4"
            onChange={(e) => handleSelectChange(e, "TteId")}
            selectedValue={formData.TteId}
          />
          <label htmlFor="TelVigente" className="col-form-label col-sm-2">
            {t.user.active}
          </label>
          <div className="col-sm-4">
            <select
              className="form-control form-select"
              id="TelVigente"
              name="TelVigente"
              value={formData.TelVigente}
              onChange={handleInputChange(formData, setFormData)}
              required
            >
              <option value={1}>Ok</option>
              <option value={0}>No</option>
            </select>
          </div>
        </div>
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

export default FormPhone;
