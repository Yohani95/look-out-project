import React from "react";
import SelectField from "../common/SelectField";
import MyDatePicker from "../common/MyDatePicker";
function FormBusiness({ t }) {
  const kamOptions = [
    { value: "optionX", label: "option1" },
    { value: "optionY", label: "option2" },
    // Agrega más opciones según sea necesario
  ];
  const options = kamOptions;
  return (
    <div className="mt-3">
        <div className="mb-3 row align-items-center">
          <label htmlFor="accountName" className="col-sm-1 col-form-label">
            {t("Account.KAM")}
          </label>
          <div className="col-sm-3">
            <input type="text" className="form-control" id="accountName"/>
          </div>
          <label htmlFor="accountName" className="col-sm-2 col-form-label">
            {t("Ficha.table.business.dateEnd")}
          </label>
          <div className="col-sm-3">
            <MyDatePicker />
          </div>
          <SelectField
            label={t("Account.country")}
            options={kamOptions}
            preOption={t("Account.select")}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-2"
          />
        </div>

        <div className=" mb-3 row align-items-center">
          <SelectField
            label={t("Account.name")}
            options={kamOptions}
            preOption={t("Account.select")}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
          />
          <div className="col-sm-2">
            <button type="button" className="badge btn btn-primary">
              {t("Common.request")} (+){" "}
            </button>
          </div>
          <label htmlFor="business_name" className="col-sm-1 col-form-label">
            {t("Account.business_name")}
          </label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="business_name" />
          </div>
        </div>

        <div className=" mb-3 row align-items-center">
          <SelectField
            label={t("Common.contact")}
            options={kamOptions}
            preOption={t("Account.select")}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
          />
          <div className="col-sm-2">
            <button type="button" className="badge btn btn-primary">
              {t("Common.add")} (+)
            </button>
          </div>
          <SelectField
            label={`${t("Account.type")} ${t("Account.business")}`}
            options={kamOptions}
            preOption={t("Account.select")}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
          />
        </div>

        <div className=" mb-3 row align-items-center">
          <label htmlFor="confirmclient" className="col-sm-1 col-form-label">
            {t("Common.confirm")} {t("Common.client")}
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
              {t("Common.uploadFile")}
            </button>
          </div>
          <label htmlFor="proposal" className="col-sm-1 col-form-label">
            {t("Common.proposal")} {t("Common.accepted", { sex: "o" })}
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
              {t("Common.uploadFile")}
            </button>
          </div>
        </div>
      <hr />

      <div className="mb-3 row align-items-center">
        <label htmlFor="estimatedStartDate" className="col-sm-1 col-form-label">
          {t("business.estimatedStartDate")}
        </label>
        <div className="col-sm-2">
          <MyDatePicker />
        </div>
        <label htmlFor="estimatedTerm" className="col-sm-1 col-form-label">
          {t("business.estimatedTerm")}
        </label>
        <div className="col-sm-2">
          <input type="text" className="form-control" id="estimatedTerm" />
        </div>
        <div className="col-sm-2">
          <select className="form-control form-select">
            <option value="">{t("Account.select")}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="estimatedClosingDate" className="col-sm-2 col-form-label">
          {t("business.estimatedClosingDate")}
        </label>
        <div className="col-sm-2">
          <input type="text" className="form-control" id="estimatedClosingDate" disabled />
        </div>
      </div>
    </div>
  );
}

export default FormBusiness;
