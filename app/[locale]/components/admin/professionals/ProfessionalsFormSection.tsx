import React from 'react';
import {
  handleSelectChange,
  handleInputChange,
} from '@/app/[locale]/utils/Form/UtilsForm';
import MyDatePicker from '@/app/[locale]/components/common/MyDatePicker';
import SelectField from '@/app/[locale]/components/common/SelectField';
function ProfessionalsFormSection({
  t,
  formData,
  setFormData,
  countryOptions,
  formik,
  perfiles,
}) {
  return (
    <>
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
          {formik?.errors && formik.errors.perNombres && (
            <div className="error-message">{formik.errors.perNombres}</div>
          )}
        </div>
        <label htmlFor="perApellidoPaterno" className="col-sm-1 col-form-label">
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
          {formik?.errors && formik.errors.perApellidoPaterno && (
            <div className="error-message">
              {formik.errors.perApellidoPaterno}
            </div>
          )}
        </div>
        <label htmlFor="perApellidoMaterno" className="col-sm-1 col-form-label">
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
          {formik?.errors && formik.errors.perApellidoMaterno && (
            <div className="error-message">
              {formik.errors.perApellidoMaterno}
            </div>
          )}
        </div>
      </div>
      <div className=" mb-3 row align-items-center">
        <label htmlFor="perIdNacional" className="col-sm-1 col-form-label">
          {t?.Common.rut}
        </label>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            id="perIdNacional"
            name="perIdNacional"
            value={formData.perIdNacional}
            onChange={handleInputChange(formData, setFormData)}
          />
          {formik?.errors && formik.errors.perIdNacional && (
            <div className="error-message">{formik.errors.perIdNacional}</div>
          )}
        </div>
        <label htmlFor="perApellidoMaterno" className="col-sm-1 col-form-label">
          {t.Common.birthDay}
        </label>
        <div className="col-sm-3">
          <MyDatePicker
            selectedDate={
              formData.perFechaNacimiento != null
                ? new Date(formData.perFechaNacimiento)
                : null
            }
            onChange={(date) =>
              setFormData({ ...formData, perFechaNacimiento: date })
            }
            title={t.Common.date}
            isRequired={false}
          />
          {formik?.errors && formik.errors.perFechaNacimiento && (
            <div className="error-message">
              {formik.errors.perFechaNacimiento}
            </div>
          )}
        </div>
        <SelectField
          label={t.Account.country}
          options={countryOptions}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, 'paiId', setFormData)}
          selectedValue={formData.paiId}
        />
        {formik?.errors && formik.errors.paiId && (
          <div className="error-message">{formik.errors.paiId}</div>
        )}
      </div>
      <div className=" mb-3 row align-items-center">
        <SelectField
          label={t.Common.profile}
          options={perfiles}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, 'perfilId', setFormData)}
          selectedValue={formData.perfilId}
        />
      </div>
    </>
  );
}

export default ProfessionalsFormSection;
