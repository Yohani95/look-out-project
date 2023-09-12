"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import { useRouter } from "next/navigation";
import { fetchPersonByContact } from "@/app/[locale]/utils/person/UtilsPerson";
import {
    handleInputChange,
    handleFormSubmit,
    fetchaddressType,
    fetchaddressById,
  } from "@/app/[locale]/utils/address/UtilsAddress";
  import {fetchComuna} from "@/app/[locale]/utils/comuna/utilsComuna" 
function AddressForm({ locale, isEdit, isCreate, idAddress }) {
  const router = useRouter();
  const [addressOptions, setAddressOptions] = useState([]);
  const [personOptions, setpersonOptions] = useState([]);
  const [comunaOptions, setComunaOptions] = useState([]);
  const [formData, setFormData] = useState({
    dirId: 0,
    CliId: "",
    PerId: 0,
    dirCalle: "",
    comId: 0,
    dirBlock: 0,
    tdirId: 0,
  });
  const t = require(`@/messages/${locale}.json`);
  useEffect(() => {
    fetchComuna().then((data) => {
      const options = data.data.map((item) => ({
        value: item.comId,
        label: item.comNombre,
      }));
      setComunaOptions(options);
    });
  }, []);
  useEffect(() => {
    fetchaddressType().then((data) => {
      const options = data.data.map((item) => ({
        value: item.temId,
        label: item.temNombre,
      }));
      setAddressOptions(options);
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
  if (idAddress != null && !isNaN(idAddress)) {
    useEffect(() => {
      fetchaddressById(idAddress, t, setFormData, router.push);
    }, [idAddress]);
  }
  const cancel = () => {
    router.push("/admin/address/search");
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
            {isEdit ? t.Common.edit : `${t.Common.create} ${t.Common.address}`}
          </h4>
        ) : (
          <h4>{t.Account.phone}</h4>
        )}{" "}
        <div className="mb-3 row align-items-center">
          <label htmlFor="dirCalle" className="col-sm-2 col-form-label">
            {t.Account.phone}
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="dirCalle"
              name="dirCalle"
              value={formData.dirCalle}
              onChange={handleInputChange(formData, setFormData)}
              //title={t.Common.invalidPhoneNumber}
              required
            />
          </div>
          <label htmlFor="dirBlock" className="col-sm-2 col-form-label">
            {t.Account.phone}
          </label>
          <div className="col-sm-1">
            <input
              type="number"
              className="form-control"
              id="dirBlock"
              name="dirBlock"
              value={formData.dirBlock}
              onChange={handleInputChange(formData, setFormData)}
              title={t.Common.dirBlock}
              //pattern="[0-9]{9}"
              required
            />
            <SelectField
              label={`${t.Common.contact}`}
              options={comunaOptions}
              preOption={t.Account.select}
              labelClassName="col-sm-1 col-form-label"
              divClassName="col-sm-2"
              onChange={(e) => handleSelectChange(e, "comId")}
              selectedValue={formData.comId}
            />
          </div>
        </div>
        <div className=" mb-3 row align-items-center">
          <SelectField
            label={`${t.Account.type} ${t.Account.phone}`}
            options={addressOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-2 col-form-label"
            divClassName="col-sm-4"
            onChange={(e) => handleSelectChange(e, "tdirId")}
            selectedValue={formData.tdirId}
          />
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

export default AddressForm;
