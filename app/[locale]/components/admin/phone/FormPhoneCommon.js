"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import { fetchPhoneType } from "@/app/[locale]/utils/phone/UtilsPhone";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { FaTrash } from "react-icons/fa";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Button } from "react-bootstrap";
function FormPhoneCommon({
  t,
  telefonos,
  formData,
  setFormData,
  handleInputChange,
}) {
  const [phoneOptions, setPhoneOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tablaCommon, setTablaCommon] = useState([]);
  const [formPhone, setFormtelefono] = useState({
    telId: 0,
    cliId: null,
    telNumero: "",
    tteId: 0,
    telVigente: 0,
  });
  const columns = [
    //{ title: t.Common.correlative, key: "telId" },
    { title: t.Common.phone, key: "telNumero" },
    { title: t.Account.type, key: "tteId" },
    { title: t.user.active, key: "telVigente" },
    {
      title: t.Account.action, // Título de la columna de acciones
      key: "actions",
      render: (item) => (
        <Button size="sm" variant="link">
          <FaTrash
            size={16}
            className=""
            onClick={() => handleDeleteItem(item.telNumero)}
          />
        </Button>
      ),
    },
  ];
  useEffect(() => {
    fetchPhoneType().then((data) => {
      const options = data.map((item) => ({
        value: item.tteId,
        label: item.tteNombre,
      }));
      setPhoneOptions(options);
    });
  }, []);
  if (telefonos != null) {
    setIsLoading(true);
  }
  const handleAddToTablaCommon = () => {
    if (!formPhone.telNumero || !formPhone.tteId || !formPhone.telVigente) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.FieldsAreRequired,
        type: t.notification.warning.type,
      });
      return;
    }
    const index = tablaCommon.findIndex(
      (element) => element.telNumero === formPhone.telNumero
    );
    if (index !== -1) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.phoneExist,
        type: t.notification.warning.type,
      });
      return;
    }
    const typeLabel = phoneOptions.find(
      (option) => option.value == formPhone.tteId
    )?.label;
    const nuevoElementoTabla = {
      telId: 0,
      cliId: null,
      telNumero: formPhone.telNumero,
      tteId: typeLabel,
      telVigente:
        formPhone.telVigente == 1 ? (
          <FaCheck style={{ color: "green" }} />
        ) : (
          <FaTimes style={{ color: "red" }} />
        ),
    };

    const nuevoElementoData = {
      telId: 0,
      cliId: null,
      telNumero: formPhone.telNumero,
      tteId: formPhone.tteId,
      telVigente: formPhone.telVigente,
    };
    setFormData((prevData) => ({
      ...prevData,
      telefonos: [...prevData.telefonos, nuevoElementoData],
      // Mantén los ids en formData sin cambiarlos
    }));
    setTablaCommon([...tablaCommon, nuevoElementoTabla]);
  };

  const handleDeleteItem = (phoneTel) => {
    // Encuentra el índice del elemento en tablaCommon que coincide con el emaemail
    const index = tablaCommon.findIndex(
      (element) => element.telNumero === phoneTel
    );
    if (index !== -1) {
      const updatedTablaCommon = [...tablaCommon];
      const updatedListData = [...formData.telefonos];

      // Elimina el elemento de tablaCommon
      updatedTablaCommon.splice(index, 1);

      setTablaCommon(updatedTablaCommon);
      //Actualizar DAta despues de la tabla
      const listData = updatedListData.findIndex(
        (element) => element.telNumero == phoneTel
      );
      if (listData !== -1) {
        updatedListData.splice(listData, 1);
      }

      setFormData((prevData) => ({
        ...prevData,
        telefonos: updatedListData,
      }));
    }
  };
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    setFormtelefono((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
  };
  return (
    <>
      <div className=" mb-3 row align-items-center ">
        <label htmlFor="telNumero" className="col-sm-2 col-form-label">
        {t.Account.phone}
        </label>
        <div className="col-sm-3">
          <input
            type="number"
            className="form-control"
            id="telNumero"
            name="telNumero"
            value={formPhone.telNumero}
            onChange={handleInputChange(formData, setFormtelefono)}
            pattern="[0-9]{9}"
            title={t.Common.invalidPhoneNumber}
            //title={t.Common.emaEmail}
          />
        </div>
        <SelectField
          label={`${t.Account.type} ${t.Account.phone}`}
          options={phoneOptions}
          preOption={t.Account.select}
          labelClassName="col-sm-2 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "tteId")}
          selectedValue={formPhone.tteId}
        />
        <label htmlFor="telVigente" className="col-form-label col-sm-1">
          {t.user.active}
        </label>
        <div className="col-sm-1">
          <select
            className="form-control form-select"
            id="telVigente"
            name="telVigente"
            value={formPhone.telVigente}
            onChange={handleInputChange(formPhone, setFormtelefono)}
            required
          >
            <option value={1}>Ok</option>
            <option value={0}>No</option>
          </select>
        </div>
        <div className="col-sm-1">
          <button
            type="button"
            className="text-end badge btn btn-primary"
            onClick={handleAddToTablaCommon}
          >
            {t.Common.add} ...{" "}
          </button>
        </div>
      </div>
      {isLoading ? (
        <LoadingData loadingMessage={t.Common.loadingData} />
      ) : error ? (
        <ErroData message={t.Common.errorMsg} />
      ) : telefonos == [] ? ( // Verifica si no hay datos
        <div className="text-center justify-content-center align-items-center">
          <h4>{t.Account.phone} {t.Common.noData}</h4>
        </div>
      ) : (
        <TableCommon
          columns={columns}
          noResultsFound={t.Common.noResultsFound}
          data={tablaCommon}
          title=""
          search={t.Account.table.search}
        />
      )}
    </>
  );
}

export default FormPhoneCommon;
