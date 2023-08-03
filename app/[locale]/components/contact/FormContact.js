import React from "react";
import SelectField from "../common/SelectField";
function FormContact({ t }) {
  const kamOptions = [
    { value: "optionX", label: "option1" },
    { value: "optionY", label: "option2" },
    // Agrega más opciones según sea necesario
  ];
  return (
    <div className="container mt-3">
      <form>
        <div className="mb-3 row align-items-center">
          <label htmlFor="accountName" className="col-sm-2 col-form-label">
            {t('Account.contact_name')}
          </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="accountName" />
          </div>
          <SelectField
            label={t('Account.KAM')}
            options={kamOptions}
            preOption={t('Account.select')}
            labelClassName="col-sm-2 col-form-label"
            divClassName="col-sm-4"
          />
        </div>
        <div className=" mb-3 row align-items-center">
          <label htmlFor="accountName" className="col-sm-2 col-form-label">
          {t('Account.position')}
          </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="accountName" />
          </div>
          <label htmlFor="accountName" className="col-sm-2 col-form-label">
          {t('Account.phone')} 1
          </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="accountName" />
          </div>
        </div>
        <div className=" mb-3 row align-items-center">
          <SelectField
            label={t('Account.account')}
            options={kamOptions}
            preOption={t('Account.select')}
            labelClassName="col-sm-2 col-form-label"
            divClassName="col-sm-4"
          />
          <label htmlFor="accountName" className="col-sm-2 col-form-label">
          {t('Account.phone')} 
          </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="accountName" />
          </div>
        </div>
        <div className=" mb-3 row align-items-center">
          <label htmlFor="accountName" className="col-sm-2 col-form-label">
          {t('Ficha.table.contacts.rol')} 
          </label>
          <div className="col-sm-4">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
              />
              <label class="form-check-label" for="inlineRadio1">
              {t('Common.decisor')}
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />
              <label class="form-check-label" for="inlineRadio2">
              {t('Common.influencer')}
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input cursor-point"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="option3"
              />
              <label class="form-check-label" for="inlineRadio3">
                 {t('Common.other')}
              </label>
            </div>
          </div>
          <label htmlFor="accountName" className="col-sm-2 col-form-label">
          {t('Account.Email')}
          </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="accountName" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormContact;
