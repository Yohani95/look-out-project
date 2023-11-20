import React from "react";
import { handleSelectChange } from "@/app/[locale]/utils/Form/UtilsForm";
import { personTipoPersonaApiUrl } from "@/app/api/apiConfig";
import { Constantes } from "@/app/api/models/common/Constantes";
import Persona from "@/app/api/models/admin/Persona";
import SelectField from "@/app/[locale]/components/common/SelectField";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
const ParticipanteForm = ({
  perfiles,
  professionals,
  t,
  formData,
  setFormData,
  formik,
}) => {
  return (
    <>
      <div className=" mb-3 row align-items-center">
        <SelectField
          label={`${t.Common.professionals}`}
          options={professionals}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "perId", setFormData)}
          selectedValue={formData.perId}
        />
        <SelectField
          label={`${t.Common.profile}`}
          options={perfiles}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "prfId",setFormData)}
          selectedValue={formData.prfId}
        />
        <label htmlFor="fechaAsignacion" className="col-sm-1 col-form-label">
          {t.Common.dateAssignment}
        </label>
        <div className="col-sm-2">
          <MyDatePicker
            selectedDate={formData.fechaAsignacion}
            onChange={(date) =>
              setFormData({ ...formData, fechaAsignacion: date })
            }
            title={t.Common.date}
          />
        </div>
        <label htmlFor="fechaTermino" className="col-sm-1 col-form-label">
          {t.project.dateEnd}
        </label>
        <div className="col-sm-2">
          <MyDatePicker
            selectedDate={formData.fechaTermino}
            onChange={(date) =>
              setFormData({ ...formData, fechaTermino: date })
            }
            title={t.Common.date}
          />
        </div>
      </div>
    </>
  );
};

export default ParticipanteForm;
