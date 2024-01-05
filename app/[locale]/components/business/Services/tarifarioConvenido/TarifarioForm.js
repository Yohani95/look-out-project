import React from "react";
import TarifarioConvenido from "@/app/api/models/proyecto/TarifarioConvenido";
import { Constantes } from "@/app/api/models/common/Constantes";
import SelectField from "@/app/[locale]/components/common/SelectField";
import {
  handleSelectChange,
  handleInputChange,
} from "@/app/[locale]/utils/Form/UtilsForm";
function TarifarioForm({ t, tarifario, data, setFormData,idMoneda }) {
  const formData = new TarifarioConvenido(tarifario);
  const opcionesTiempo = Constantes.generarOpcionesDeTiempo(t);
  return (
    <>
      <div className="mb-3 row align-items-center ">
        <SelectField
          label={t.Common.profile}
          options={data.perfiles}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) =>
            handleSelectChange(e, "tcPerfilAsignado", setFormData)
          }
          selectedValue={formData.tcPerfilAsignado}
        />
        <label htmlFor="tcTarifa" className="col-sm-1 col-form-label">
          {t.Common.fee}
        </label>
        <div className="col-sm-2">
          <input
            type="text" // Cambiado a tipo "text" para permitir decimales
            className="form-control"
            name="tcTarifa"
            id="tcTarifa"
            value={formData.tcTarifa}
            onChange={(e) => {
              const inputValue = e.target.value;
              // Validar que el valor ingresado sea un número decimal
              if (/^\d*\.?\d*$/.test(inputValue)) {
                // Actualizar el estado con el nuevo valor si es válido
                setFormData({
                  ...formData,
                  tcTarifa: inputValue,
                });
              }
            }}
          />
        </div>
        <label htmlFor="tcMoneda" className="col-sm-1 col-form-label">
          {t.Common.currency}
        </label>
        <div className="col-sm-2">
            <span disabled className="form-control">{data.monedas.find((moneda) => moneda.value ==idMoneda)?.label}</span>
        </div>
        <SelectField
          label={t.Common.base}
          options={opcionesTiempo}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "tcBase", setFormData)}
          selectedValue={formData.tcBase}
        />
      </div>
    </>
  );
}

export default TarifarioForm;
