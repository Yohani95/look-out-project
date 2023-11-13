"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { FaTrash } from "react-icons/fa";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { fetchComuna } from "@/app/[locale]/utils/comuna/utilsComuna";
import { fetchaddressType,fetchaddressByIdPerson} from "@/app/[locale]/utils/address/UtilsAddress";
import Address from "@/app/api/models/admin/Address";
import ErroData from "@/app/[locale]/components/common/ErroData";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import { handleInputChange,handleSelectChange } from "@/app/[locale]/utils/Form/UtilsForm";
function FormAddressCommon({
  t,
  formData,
  setFormData,
  idPersona
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tablaCommon, setTablaCommon] = useState([]);
  const [comunaOptions, setComunaOptions] = useState([]);
  const [addressOptions, setAddressOptions] = useState([]);
  const [formDataAddress, setFormDataAddress] = useState(new Address());
  const columns = [
    { title: "ID", key: "dirId" },
    { title: t.Common.address, key: "dirCalle" },
    { title: t.Common.number, key: "dirNumero" },
    { title: t.Common.blockAddress, key: "dirBlock" },
    { title: t.Common.commune, key: "comId" },
    { title: t.Ficha.type, key: "tdiId" },
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
  if (idPersona) {
    useEffect(() => {
      fetchaddressByIdPerson(idPersona, t)
        .then((data) => {
          const newAddress = data.map((item) => {
            setTablaCommon((prevTablaCommon) => [
              ...prevTablaCommon,
              {
                ...item,
                tdiId: item.tdi.tdiNombre,
                comId: item.com.comNombre
              }
            ]);
            const address = new Address(item);
            return address; // Devolver el objeto creado
          });

          console.log(newAddress)
          setFormData((prevData) => ({
            ...prevData,
            direcciones: newAddress, // Agregar los objetos  al arreglo
          }));
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          setError(true);
          setIsLoading(false);
        });
    }, []);
  }
  useEffect(() => {
    fetchComuna().then((data) => {
      const options = data.map((item) => ({
        value: item.comId,
        label: item.comNombre,
      }));
      setComunaOptions(options);
    });
    if(!idPersona) setIsLoading(false)
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
      !formDataAddress.tdiId ||
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
        (element) => element.dirCalle === formDataAddress.dirCalle && element.dirCalle === formDataAddress.dirNumero
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
      (option) => option.value == formDataAddress.tdiId
    )?.label;
    const nuevoElementoTabla = {
      dirId: 0,
      CliId: null,
      dirCalle: formDataAddress.dirCalle,
      dirNumero: formDataAddress.dirNumero,
      comId: typeLabelComuna,
      dirBlock: formDataAddress.dirBlock,
      tdiId: typeLabelType,
    };
    formDataAddress.perId=idPersona;
    setFormData((prevData) => ({
      ...prevData,
      direcciones: [...prevData.direcciones, formDataAddress],
      // Mantén los ids en formData sin cambiarlos
    }));
    setTablaCommon([...tablaCommon, nuevoElementoTabla]);
  };
  const handleDeleteItem = (direccion) => {
    console.log(direccion)
    // Encuentra el índice del elemento en tablaCommon que coincide con el emaemail
    const index = tablaCommon.findIndex(
       (element) =>
    element.dirId === direccion.dirId ||
    (element.dirCalle === direccion.dirCalle && element.dirNumero === direccion.dirNumero)
);
    if (index !== -1) {
      const updatedTablaCommon = [...tablaCommon];
      const updatedListData = [...formData.direcciones];

      // Elimina el elemento de tablaCommon
      updatedTablaCommon.splice(index, 1);

      setTablaCommon(updatedTablaCommon);
      //Actualizar DAta despues de la tabla
      const listData = updatedListData.findIndex(
        (element) => element.dirCalle === direccion.dirCalle && element.dirNumero === direccion.dirNumero || element.dirId=== direccion.dirId
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

  if (error) return <ErroData message={t.Common.errorOccurred} />;
  return (
    <>
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
        <div className="col-sm-2">
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
          onChange={(e) => handleSelectChange(e, "comId",setFormDataAddress)}
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
          onChange={(e) => handleSelectChange(e, "tdiId",setFormDataAddress)}
          selectedValue={formDataAddress.tdiId}
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
      ) : tablaCommon.length === 0  ? ( // Verifica si no hay datos
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
