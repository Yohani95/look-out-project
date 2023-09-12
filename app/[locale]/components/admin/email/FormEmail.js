"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import { useRouter } from "next/navigation";
import { fetchPersonByContact } from "@/app/[locale]/utils/person/UtilsPerson";
import {
  handleInputChange,
  handleFormSubmit,
  fetchemailType,
  fetchemailById,
} from "@/app/[locale]/utils/email/UtilsEmail";
function FormEmail({ locale, isEdit, isCreate, idEmail }) {
  const router = useRouter();
  const [emailOptions, setEmailOptions] = useState([]);
  const [personOptions, setpersonOptions] = useState([]);
  const t = require(`@/messages/${locale}.json`);
  const [formData, setFormData] = useState({
    emaId: 0,
    cliId: null,
    perId: 0,
    emaEmail: "",
    temId: 0,
    emaVigente: 0,
  });

  useEffect(() => {
    fetchemailType().then((data) => {
      const options = data.map((item) => ({
        value: item.temId,
        label: item.temNombre,
      }));
      setEmailOptions(options);
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

  if (idEmail!= null && !isNaN(idEmail)) {
    useEffect(() => {
      fetchemailById(idEmail,t,setFormData,router.push);
    }, [idEmail]);
  }

  const cancel = () => {
    router.push("/admin/email/search");
  };
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    setFormData((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
  };
  const handleSubmit = handleFormSubmit(
    formData,
    t,
    router.push,
    isEdit,
    setFormData
  );
  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={!isCreate && !isEdit ? true : false}>
        {isCreate || isEdit ? (
          <h4>
            {isEdit ? t.Common.edit : `${t.Common.create} ${t.Common.email}`}
          </h4>
        ) : (
          <h4>{t.Account.phone}</h4>
        )}
        <div className="mb-3 row align-items-center">
          <label htmlFor="emaEmail" className="col-sm-2 col-form-label">
            {t.Common.email}
          </label>
          <div className="col-sm-4">
            <input
              type="email"
              className="form-control"
              id="emaEmail"
              name="emaEmail"
              value={formData.emaEmail}
              onChange={handleInputChange(formData, setFormData)}
              //title={t.Common.emaEmail}
              required
            />
          </div>
          <SelectField
            label={`${t.Common.contact}`}
            options={personOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-2 col-form-label"
            divClassName="col-sm-4"
            onChange={(e) => handleSelectChange(e, "perId")}
            selectedValue={formData.perId}
          />
        </div>

        <div className=" mb-3 row align-items-center">
          <SelectField
            label={`${t.Account.type} ${t.Common.email}`}
            options={emailOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-2 col-form-label"
            divClassName="col-sm-4"
            onChange={(e) => handleSelectChange(e, "temId")}
            selectedValue={formData.temId}
          />
          <label htmlFor="emaVigente" className="col-form-label col-sm-2">
            {t.user.active}
          </label>
          <div className="col-sm-4">
            <select
              className="form-control form-select"
              id="emaVigente"
              name="emaVigente"
              value={formData.emaVigente}
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

export default FormEmail;
