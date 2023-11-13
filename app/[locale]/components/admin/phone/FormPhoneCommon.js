"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import {
  fetchPhoneType,
  fetchPhoneByIdPerson,
} from "@/app/[locale]/utils/phone/UtilsPhone";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { FaTrash } from "react-icons/fa";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Phone from "@/app/api/models/admin/Phone";
import ErroData from "@/app/[locale]/components/common/ErroData";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import { handleInputChange } from "@/app/[locale]/utils/Form/UtilsForm";
function FormPhoneCommon({ t, formData, setFormData, idPersona }) {
  const [phoneOptions, setPhoneOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tablaCommon, setTablaCommon] = useState([]);
  const [formPhone, setFormtelefono] = useState(new Phone());
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
  const status = [
    { label: t.Common.no, value: 0 },
    { label: t.Common.yes, value: 1 },
  ];
  useEffect(() => {
    fetchPhoneType().then((data) => {
      const options = data.map((item) => ({
        value: item.tteId,
        label: item.tteNombre,
      }));
      setPhoneOptions(options);
      if(!idPersona) setIsLoading(false)
    });
  }, []);
  if (idPersona) {
    useEffect(() => {
      fetchPhoneByIdPerson(idPersona, t, setFormData)
        .then((data) => {
          const newPhones = data.map((item) => {
            const nuevoElementoTabla = {
              telId: item.telId,
              telNumero: item.telNumero,
              cliId: item.cliId,
              perId: item.perId,
              tteId: item.tipoTelefono.tteNombre,
              telVigente:
                item.telVigente == 1 ? (
                  <FaCheck style={{ color: "green" }} />
                ) : (
                  <FaTimes style={{ color: "red" }} />
                ),
            };
            setTablaCommon((prevTablaCommon) => [
              ...prevTablaCommon,
              nuevoElementoTabla,
            ]);
            const phone = new Phone(item);
            return phone; // Devolver el objeto creado
          });
          setFormData((prevData) => ({
            ...prevData,
            telefonos: newPhones, // Agregar los objetos  al arreglo
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
    formPhone.perId=idPersona;
    setFormData((prevData) => ({
      ...prevData,
      telefonos: [...prevData.telefonos, formPhone],
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
      console.log(updatedListData)
      setFormData((prevData) => ({
        ...prevData,
        telefonos: updatedListData,
      }));
    }
  };
  useEffect(()=>{
    console.log(formData)
  },[formData])
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    setFormtelefono((prevData) => ({
      ...prevData,
      [fieldName]: selectedValue,
    }));
  };
  if (error) return <ErroData message={t.Common.errorOccurred} />;
  return (
    <>
      <div className=" mb-3 row align-items-center ">
        <label htmlFor="telNumero" className="col-sm-1 col-form-label">
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
        <SelectField
          label={t.user.active}
          options={status}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "telVigente")}
          selectedValue={formPhone.telVigente}
        />
      </div>
      <div className=" mb-3 row align-items-center ">
      <SelectField
          label={`${t.Ficha.main_account} `}
          options={status}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "TelPrincipal")}
          selectedValue={formPhone.TelPrincipal}
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
      ) : tablaCommon.length === 0 ? ( // Verifica si no hay datos
        <div className="text-center justify-content-center align-items-center">
          <h6>{t.Account.phone}</h6>
          {t.Common.noData}
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
