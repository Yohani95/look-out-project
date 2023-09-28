"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import { useRouter } from "next/navigation";
import {
  handleInputChange,
  handleFormSubmit,
  fetchPerfilType,
  fetchPerfilById,
} from "@/app/[locale]/utils/admin/perfil/UtilsPerfil";
function FormPerfil({ locale, isEdit, isCreate, idPerfil }) {
  const router = useRouter();
  const [perfilOptions, setPerfilOptions] = useState([]);
  const t = require(`@/messages/${locale}.json`);
  const [formData, setFormData] = useState({
    id: null,
    prfNombre: "",
    prfDescripcion: "",
  });

  if (idPerfil!= null && !isNaN(idPerfil)) {
    useEffect(() => {
      fetchPerfilById(idPerfil,t,setFormData,router.push);
    }, [idPerfil]);
  }

  const cancel = () => {
    router.push("/admin/pefil/search");
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
    <form>
      <fieldset disabled={!isCreate && !isEdit ? true : false}>
        {isCreate || isEdit ? (
          <h4>
            {isEdit ? `${t.Common.edit} ${t.Common.perfil}` : `${t.Common.create} ${t.Common.perfil}`}
          </h4>
        ) : (
          <h4>{t.Account.perfil}</h4>
        )}
        <div className="mb-3 row align-items-center">
          <label htmlFor="prfNombre" className="col-sm-2 col-form-label">
            {t.Common.perfil}
          </label>
          <div className="col-sm-4">
            <input
              type="perfil"
              className="form-control"
              id=""
              name="prfNombre"
              value={formData.prfNombre}
              onChange={handleInputChange(formData, setFormData)}
              required
            />
          </div>
          <label htmlFor="prfDescripcion" className="col-sm-2 col-form-label">
            {t.Common.perfil}
          </label>
          <div className="col-sm-4">
          <input
              type="perfil"
              className="form-control"
              id=""
              name="prfDescripcion"
              value={formData.prfDescripcion}
              onChange={handleInputChange(formData, setFormData)}
              //title={t.Common.prfNombre}
              required
            />
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

export default FormPerfil;
