"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { FaTrash } from "react-icons/fa";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { fetchComuna } from "@/app/[locale]/utils/comuna/utilsComuna";
import { fetchaddressType } from "@/app/[locale]/utils/address/UtilsAddress";
function FormAddressCommon({
  t,
  direcciones,
  formData,
  setFormData,
  handleInputChange,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tablaCommon, setTablaCommon] = useState([]);
  const [comunaOptions, setComunaOptions] = useState([]);
  const [addressOptions, setAddressOptions] = useState([]);
  const [formDataAddress, setFormDataAddress] = useState({
    dirId: 0,
    CliId: "",
    PerId: 0,
    dirCalle: "",
    dirNumero: "",
    comId: 0,
    dirBlock: 0,
    tdirId: 0,
  });
  const columns = [
    { title: "ID", key: "dirId" },
    { title: t.Common.address, key: "dirCalle" },
    { title: t.Common.number, key: "dirNumero" },
    { title: t.Common.blockAddress, key: "dirBlock" },
    { title: t.Common.commune, key: "comId" },
    { title: t.Ficha.type, key: "tdirId" },
    {
      title: t.Account.action, // Título de la columna de acciones
      key: "actions",
      render: (item) => (
        <Button size="sm" variant="link">
          <FaTrash
            size={16}
            className=""
            onClick={() => handleDeleteItem(item)}
          />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchComuna().then((data) => {
      const options = data.map((item) => ({
        value: item.comId,
        label: item.comNombre,
      }));
      setComunaOptions(options);
    });
  }, []);
  useEffect(() => {
    fetchaddressType().then((data) => {
      const options = data.map((item) => ({
        value: item.temId,
        label: item.temNombre,
      }));
      setAddressOptions(options);
    });
  }, []);
  const handleAddToTablaCommon = () => {
    if (
      !formDataAddress.dirCalle ||
      !formDataAddress.tdirId ||
      !formDataAddress.dirNumero
    ) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.FieldsAreRequired,
        type: t.notification.warning.type,
      });
      return;
    }
    const index = tablaCommon.findIndex(
      (element) =>
        element.dirCalle === formDataAddress.dirCalle &&
        element.dirCalle === formDataAddress.dirNumero
    );
    if (index !== -1) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.phoneExist,
        type: t.notification.warning.type,
      });
      return;
    }
    const typeLabelComuna = comunaOptions.find(
      (option) => option.value == formDataAddress.comId
    )?.label;
    const typeLabelType = addressOptions.find(
      (option) => option.value == formDataAddress.tdirId
    )?.label;
    console.log(typeLabelType);
    const nuevoElementoTabla = {
      dirId: 0,
      CliId: null,
      dirCalle: formDataAddress.dirCalle,
      dirNumero: formDataAddress.dirNumero,
      comId: typeLabelComuna,
      dirBlock: formDataAddress.dirBlock,
      tdirId: typeLabelType,
    };
    const nuevoElementoData = {
      dirId: 0,
      CliId: null,
      dirNumero: formDataAddress.dirNumero,
      dirCalle: formDataAddress.dirCalle,
      comId: formDataAddress.comId,
      dirBlock: formDataAddress.dirBlock,
      tdirId: formDataAddress.tdirId,
    };
    setFormData((prevData) => ({
      ...prevData,
      direcciones: [...prevData.direcciones, nuevoElementoData],
      // Mantén los ids en formData sin cambiarlos
    }));
    setTablaCommon([...tablaCommon, nuevoElementoTabla]);
  };
  const handleDeleteItem = (direccion) => {
    // Encuentra el índice del elemento en tablaCommon que coincide con el emaemail
    const index = tablaCommon.findIndex(
      (element) =>
        element.dirCalle === direccion.dirCalle &&
        element.dirNumero === direccion.dirNumero
    );
    if (index !== -1) {
      const updatedTablaCommon = [...tablaCommon];
      const updatedListData = [...formData.direcciones];

      // Elimina el elemento de tablaCommon
      updatedTablaCommon.splice(index, 1);

      setTablaCommon(updatedTablaCommon);
      //Actualizar DAta despues de la tabla
      const listData = updatedListData.findIndex(
        (element) =>
          element.dirCalle === direccion.dirCalle &&
          element.dirNumero === direccion.dirNumero
      );
      if (listData !== -1) {
        updatedListData.splice(listData, 1);
      }

      setFormData((prevData) => ({
        ...prevData,
        direcciones: updatedListData,
      }));
    }
  };
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    setFormDataAddress((prevData) => ({
      ...prevData,
      [fieldName]: selectedValue,
    }));
  };
  return (
    <>
      <h4>{t.Common.address}</h4>
      <div className="mb-3 row align-items-center">
        <label htmlFor="dirCalle" className="col-sm-1 col-form-label">
          {t.Common.address}
        </label>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            id="dirCalle"
            name="dirCalle"
            value={formDataAddress.dirCalle}
            onChange={handleInputChange(formDataAddress, setFormDataAddress)}
          />
        </div>
        <label htmlFor="dirNumero" className="col-sm-1 col-form-label">
          {t.Common.number}
        </label>
        <div className="col-sm-1">
          <input
            type="number"
            className="form-control"
            id="dirNumero"
            name="dirNumero"
            value={formDataAddress.dirNumero}
            onChange={handleInputChange(formDataAddress, setFormDataAddress)}
            min={1}
            max={9999}
            pattern="[0-9]{5}"
          />
        </div>
        <label htmlFor="dirBlock" className="col-sm-1 col-form-label">
          {t.Common.blockAddress}
        </label>
        <div className="col-sm-1">
          <input
            type="number"
            className="form-control"
            id="dirBlock"
            name="dirBlock"
            value={formDataAddress.dirBlock}
            onChange={handleInputChange(formDataAddress, setFormDataAddress)}
            min={1}
            max={9999}
            maxLength={5}
            pattern="[0-9]{5}"
          />
        </div>
        <SelectField
          label={`${t.Common.commune}`}
          options={comunaOptions}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "comId")}
          selectedValue={formDataAddress.comId}
        />
      </div>
      <div className=" mb-3 row align-items-center">
        <SelectField
          label={`${t.Account.type} ${t.Common.address}`}
          options={addressOptions}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, "tdirId")}
          selectedValue={formDataAddress.tdirId}
        />
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
      ) : direcciones == [] ? ( // Verifica si no hay datos
        <div className="text-center justify-content-center align-items-center">
          <h4>{t.Common.address}</h4> {t.Common.noData}
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

export default FormAddressCommon;
