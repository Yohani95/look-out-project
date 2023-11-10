"use client";
import React, { useState, useEffect } from "react";
import SelectField from "@/app/[locale]/components/common/SelectField";
import { fetchemailType } from "@/app/[locale]/utils/email/UtilsEmail";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Button } from "react-bootstrap";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import ErroData from "@/app/[locale]/components/common/ErroData";
import { fetchemailByIdPersona } from "@/app/[locale]/utils/email/UtilsEmail";
import Email from "@/app/api/models/admin/Email";
function FormEmailCommon({
  t,
  idEmail,
  formData,
  setFormData,
  handleInputChange,
  idPersona,
}) {
  const [emailOptions, setEmailOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tablaCommon, setTablaCommon] = useState([]);
  const [formEmail, setFormEmail] = useState(new Email());
  const columns = [
    // { title: t.Common.correlative, key: "emaId" },
    { title: t.Common.email, key: "emaEmail" },
    { title: t.Account.type, key: "temId" },
    { title: t.user.active, key: "emaVigente" },
    {
      title: t.Account.action, // Título de la columna de acciones
      key: "actions",
      render: (item) => (
        <Button size="sm" variant="link">
          <FaTrash
            size={16}
            className=""
            onClick={() => handleDeleteItem(item.emaEmail)}
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
    fetchemailType().then((data) => {
      const options = data.map((item) => ({
        value: item.temId,
        label: item.temNombre,
      }));
      setEmailOptions(options);
      if(!idPersona) setIsLoading(false)
    });
  }, []);
  if(idPersona){
    useEffect(() => {
      fetchemailByIdPersona(idPersona, t, setFormData)
        .then((data) => {
          const newEmails = data.map((item) => {
            const nuevoElementoTabla = {
              emailId: 0,
              emaEmail: item.emaEmail,
              temId: item.tem.temNombre,
              emaVigente:
                item.emaVigente == 1 ? (
                  <FaCheck style={{ color: "green" }} />
                ) : (
                  <FaTimes style={{ color: "red" }} />
                ),
            };
            setTablaCommon((prevTablaCommon) => [
              ...prevTablaCommon,
              nuevoElementoTabla,
            ]);
            const email = new Email(item);
            return email; // Devolver el objeto Email creado
          });
  
          setFormData((prevData) => ({
            ...prevData,
            emails: newEmails, // Agregar los objetos Email al arreglo emails
          }));
        })
        .then(() => {
          setIsLoading(false);
        }).catch((error)=>{
          setError(true)
          setIsLoading(false);
        });
    }, []);
  }
  const handleAddToTablaCommon = () => {
    if (!formEmail.emaEmail || !formEmail.temId || !formEmail.temId) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.requiredFieldEmail,
        type: t.notification.warning.type,
      });
      return;
    }
    const index = tablaCommon.findIndex(
      (element) => element.emaEmail === formEmail.emaEmail
    );
    if (index !== -1) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.emailExist,
        type: t.notification.warning.type,
      });
      return;
    }
    const typeLabel = emailOptions.find(
      (option) => option.value == formEmail.temId
    )?.label;
    const nuevoElementoTabla = {
      emailId: 0,
      emaEmail: formEmail.emaEmail,
      temId: typeLabel,
      emaVigente:
        formEmail.emaVigente == 1 ? (
          <FaCheck style={{ color: "green" }} />
        ) : (
          <FaTimes style={{ color: "red" }} />
        ),
    };
    formEmail.perId = idPersona;
    setFormData((prevData) => ({
      ...prevData,
      emails: [...prevData.emails, formEmail],
    }));
    setTablaCommon([...tablaCommon, nuevoElementoTabla]);
  };
  const handleDeleteItem = (emaEmail) => {
    // Encuentra el índice del elemento en tablaCommon que coincide con el emaemail
    const index = tablaCommon.findIndex(
      (element) => element.emaEmail === emaEmail
    );
    if (index !== -1) {
      const updatedTablaCommon = [...tablaCommon];
      const updatedListData = [...formData.emails];

      // Elimina el elemento de tablaCommon
      updatedTablaCommon.splice(index, 1);

      setTablaCommon(updatedTablaCommon);
      //Actualizar DAta despues de la tabla
      const listData = updatedListData.findIndex(
        (element) => element.emaEmail == emaEmail
      );
      if (listData !== -1) {
        updatedListData.splice(listData, 1);
      }
      // Actualiza los estados de tablaCommon y formData.listPerfil
      setFormData((prevData) => ({
        ...prevData,
        emails: updatedListData,
      }));
    }
  };
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    setFormEmail((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
  };
  if(error) return <ErroData message={t.Common.errorOccurred}/>
  return (
    <>
      <div className=" mb-3 row align-items-center ">
        <label htmlFor="emaEmail" className="col-sm-1 col-form-label">
          {t.Common.email}
        </label>
        <div className="col-sm-3">
          <input
            type="email"
            className="form-control"
            id="emaEmail"
            name="emaEmail"
            value={formEmail.emaEmail}
            onChange={handleInputChange(formEmail, setFormEmail)}
            //title={t.Common.emaEmail}
          />
        </div>
        <SelectField
          label={`${t.Account.type} ${t.Common.email}`}
          options={emailOptions}
          preOption={t.Account.select}
          labelClassName="col-sm-2 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "temId")}
          selectedValue={formEmail.temId}
        />
        <SelectField
          label={` ${t.user.active}`}
          options={status}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "emaVigente")}
          selectedValue={formEmail.emaVigente}
        />
      </div>
      <div className=" mb-3 row align-items-center ">
      <SelectField
          label={`${t.Ficha.main_account} `}
          options={status}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "emaPrincipal")}
          selectedValue={formEmail.emaPrincipal}
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
      ) : idEmail == [] ? ( // Verifica si no hay datos
        <div className="text-center justify-content-center align-items-center">
          <h4>{t.Common.email}</h4> {t.Common.noData}
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

export default FormEmailCommon;
