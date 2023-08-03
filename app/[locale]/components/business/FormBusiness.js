import React from "react";
import SelectField from "../common/SelectField";
function FormBusiness({ t }) {
  const kamOptions = [
    { value: "optionX", label: "option1" },
    { value: "optionY", label: "option2" },
    // Agrega más opciones según sea necesario
  ];
  return (
    <div className="container mt-3">
      <form>
        <div className="mb-3 row align-items-center">
          <label htmlFor="accountName" className="col-sm-1 col-form-label">
            {t("Account.KAM")}
          </label>
          <div className="col-sm-3">
            <input type="text" className="form-control" id="accountName" />
          </div>
          <label htmlFor="accountName" className="col-sm-2 col-form-label">
            {t("Ficha.table.business.dateEnd")}
          </label>
          <div className="col-sm-3">
            <input type="text" className="form-control" id="accountName" />
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
            <button className="badge btn btn-primary">{t("Common.request")} (+) </button>
          </div>
          <label htmlFor="accountName" className="col-sm-1 col-form-label">
            {t("Account.business_name")} 
          </label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="accountName" />
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
            <button className="badge btn btn-primary">{t("Common.add")} (+)</button>
          </div>
          <SelectField
            label={`${t("Account.type")} ${t("Account.business")}`}
            options={kamOptions}
            preOption={t("Account.select")}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-5"
          />
        </div>

        <div className=" mb-3 row align-items-center">
          <label htmlFor="accountName" className="col-sm-1 col-form-label">
            {t("Common.confirm")} {t('Common.client')}
          </label>
          <div className="col-sm-3">
            <input type="text disable" className="form-control" id="accountName" disabled value="valor"/>
          </div>
          <div className="col-sm-2">
            <button className="badge btn btn-primary">{t("Common.uploadFile")}</button>
          </div>
          <label htmlFor="accountName" className="col-sm-1 col-form-label">
            {t("Common.proposal")} {t('Common.accepted', { sex: "o" })}
          </label>
          <div className="col-sm-3">
            <input type="text" className="form-control" id="accountName" disabled value="valor"/>
          </div>
          <div className="col-sm-2">
            <button className="badge btn btn-primary">{t("Common.uploadFile")}</button>
          </div>
        </div>
      </form>
      <hr />
    </div>
  );
}

export default FormBusiness;
