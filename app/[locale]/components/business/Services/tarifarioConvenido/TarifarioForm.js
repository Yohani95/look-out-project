import React from "react";
import TarifarioConvenido from "@/app/api/models/proyecto/TarifarioConvenido"
import {Constantes} from "@/app/api/models/common/Constantes"
import SelectField from "@/app/[locale]/components/common/SelectField";
import {
  handleSelectChange,
  handleInputChange,
} from "@/app/[locale]/utils/Form/UtilsForm";
function TarifarioForm({t,tarifario,data,setFormData}) {
  const formData=new TarifarioConvenido(tarifario)
  const opcionesTiempo =Constantes.generarOpcionesDeTiempo(t)
  return (
    <>
      <div className="mb-3 row align-items-center ">
        <SelectField
          label={t.Common.profile}
          options={data.perfiles}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "tcPerfilAsignado",setFormData)}
          selectedValue={formData.tcPerfilAsignado}
        />
        <label htmlFor="tcTarifa" className="col-sm-1 col-form-label">
          {t.Common.fee}
        </label>
        <div className="col-sm-2">
          <input
            type="number"
            className="form-control"
            name="tcTarifa"
            id="tcTarifa"
            value={formData.tcTarifa}
            min={1}
            onChange={handleInputChange(formData, setFormData)}
          />
        </div>
        <SelectField
          label={t.Ficha.type}
          options={data.monedas}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "tcMoneda",setFormData)}
          selectedValue={formData.tcMoneda}
        />
           <SelectField
          label={t.Common.base}
          options={opcionesTiempo}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "tcBase",setFormData)}
          selectedValue={formData.tcBase}
        />
      </div>
    </>
  );
}

export default TarifarioForm;
