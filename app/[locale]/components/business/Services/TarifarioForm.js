import React from "react";

function TarifarioForm() {
  return (
    <>
      <div className="mb-3 row align-items-center ">
        <SelectField
          label={t.Common.profile}
          options={perfilOptions}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "idPerfil")}
          selectedValue={formData.idPerfil}
        />
        <label htmlFor="fee" className="col-sm-1 col-form-label">
          {t.Common.fee}
        </label>
        <div className="col-sm-2">
          <input
            type="number"
            className="form-control"
            name="fee"
            id="fee"
            value={formData.fee}
            onChange={handleInputChange(formData, setFormData)}
          />
        </div>
        <div className="col-sm-2">
          <select
            className="form-control form-select"
            onChange={(e) => handleSelectChange(e, "idMon")}
          >
            <option value="">{t.Account.select}</option>
            {monedaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="base" className="col-sm-1 col-form-label">
          {t.Common.base}
        </label>
        <div className="col-sm-2">
          <select
            className="form-control form-select"
            onChange={(e) => handleSelectChange(e, "base")}
          >
            <option value="">{t.Account.select}</option>
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-1">
          <button
            type="button"
            className="text-end badge btn btn-primary"
            onClick={handleAddToTablaCommon}
          >
            {t.Common.include} ...{" "}
          </button>
        </div>
      </div>
      <TableCommon
        columns={columns}
        noResultsFound={t.Common.noResultsFound}
        data={tablaCommon}
        title={t.business.agreedRate}
        search={t.Account.table.search}
      />
    </>
  );
}

export default TarifarioForm;
