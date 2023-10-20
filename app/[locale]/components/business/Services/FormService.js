"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import { fechtClients } from "@/app/[locale]/utils/client/ClientFormLogic";
import SelectField from "@/app/[locale]/components/common/SelectField";
import fetchCountriest from "@/app/[locale]/utils/country/Countrylist";
import { fetchTypeService } from "@/app/[locale]/utils/project/tipoServicio/UtilsTypeService";
import { fetchPersonGetbyIdClient } from "@/app/[locale]/utils/person/UtilsPerson";
import { Button } from "react-bootstrap";
import { useSession, signOut } from "next-auth/react";
import {
  handleInputChange,
  handleFormSubmit,
  GetLastIdProjecService,
  fetchServiceById,
  fetchServiceLastId,
} from "@/app/[locale]/utils/business/UtilsService";
import { FaTrash } from "react-icons/fa";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import { fetchPerfil } from "@/app/[locale]/utils/admin/perfil/UtilsPerfil";
import { fetchMoneda } from "@/app/[locale]/utils/country/moneda/UtilsMoneda";
import ProfessionalForm from "./ProfessionalForm";
function FormService({ locale, isEdit, isCreate, idService }) {
  const { data: session, status } = useSession();
  const [countryOptions, setCountryOptions] = useState([]);
  const [typeServiceOptions, setTypeServiceOptions] = useState([]);
  const [contactOptions, setContactOptions] = useState([]);
  const [accountOptions, setAccountOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [correlativo, setCorrelativo] = useState([]);
  const [perfilOptions, setPerfilOptions] = useState([]);
  const [monedaOptions, setMonedaOptions] = useState([]);
  const [tablaCommon, setTablaCommon] = useState([]);

  const [formData, setFormData] = useState({
    pryId: 0,
    cliId: 0,
    pryNombre: "",
    perId: 0,
    tseId: 0,
    paiId: 0,
    kamId: 0,
    file1: null,
    file2: null,
    endDate: "",
    startDate: "",
    closeDate: null,
    months: null,
    idMon: 0,
    idPerfil: 0,
    fee: 0,
    base: "",
    listPerfil: [],
  });
  let t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const handleAddToTablaCommon = () => {
    // Obtén los labels correspondientes a los ids seleccionados
    const idPerfilLabel = perfilOptions.find(
      (option) => option.value == formData.idPerfil
    )?.label;
    const idMonLabel = monedaOptions.find(
      (option) => option.value == formData.idMon
    )?.label;
    const nuevoElemento = {
      TcPerfilAsignado: formData.idPerfil,
      TcTarifa: formData.fee,
      TcMoneda: formData.idMon,
      TcBase: formData.base,
      TcStatus: 0,
    };
    setFormData((prevData) => ({
      ...prevData,
      listPerfil: [...prevData.listPerfil, nuevoElemento],
      // Mantén los ids en formData sin cambiarlos
    }));
    const nuevoElementoTabla = {
      idPerfil: idPerfilLabel, // Almacena el label en la tabla
      fee: formData.fee,
      idMon: idMonLabel, // Almacena el label en la tabla
      base: formData.base,
    };
    setTablaCommon([...tablaCommon, nuevoElementoTabla]);
  };
  const handleDeleteItem = (idPerfil) => {
    // Encuentra el índice del elemento en tablaCommon que coincide con el idPerfil
    const index = tablaCommon.findIndex(
      (element) => element.idPerfil === idPerfil
    );

    if (index !== -1) {
      // Crea copias de las listas tablaCommon y formData.listPerfil
      const updatedTablaCommon = [...tablaCommon];
      const updatedListPerfil = [...formData.listPerfil];

      // Elimina el elemento de tablaCommon
      updatedTablaCommon.splice(index, 1);
      const idPerfilLabel = perfilOptions.find(
        (option) => option.label == idPerfil
      )?.value;
      // Encuentra el índice del elemento en formData.listPerfil que coincide con el idPerfil
      const listPerfilIndex = updatedListPerfil.findIndex(
        (element) => element.TcPerfilAsignado == idPerfilLabel
      );
      if (listPerfilIndex !== -1) {
        // Elimina el elemento de formData.listPerfil
        updatedListPerfil.splice(listPerfilIndex, 1);
      }
      // Actualiza los estados de tablaCommon y formData.listPerfil
      setTablaCommon(updatedTablaCommon);

      setFormData((prevData) => ({
        ...prevData,
        listPerfil: updatedListPerfil,
      }));
    }
  };
  const columns = [
    { title: t.business.assignedProfile, key: "idPerfil" },
    { title: t.Common.fee, key: "fee" },
    { title: t.Common.currency, key: "idMon" },
    { title: t.Common.base, key: "base" },
    {
      title: "Acciones", // Título de la columna de acciones
      key: "actions",
      render: (item) => (
        <Button size="sm" variant="link">
          <FaTrash
            size={16}
            className=""
            onClick={() => handleDeleteItem(item.idPerfil)}
          />
        </Button>
      ),
    },
  ];
  const timeOptions = [
    { value: 1, label: t.time.month },
    { value: 2, label: t.time.week },
    { value: 3, label: t.time.hour },
    // Agrega más opciones según sea necesario
  ];
  useEffect(() => {
    fetchMoneda().then((data) => {
      const options = data.map((moneda) => ({
        value: moneda.monId,
        label: moneda.monNombre,
      }));
      setMonedaOptions(options);
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    fetchPerfil().then((data) => {
      const options = data.map((perfil) => ({
        value: perfil.id,
        label: perfil.prf_Nombre + " " + perfil.prf_Descripcion,
      }));
      setPerfilOptions(options);
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    if (isCreate) {
      fetchServiceLastId(t, router.push).then((result) => {
        setCorrelativo(result.data + 1);
      });
    }
  }, []);
  useEffect(() => {
    fetchCountriest().then((data) => {
      const options = data.map((country) => ({
        value: country.paiId,
        label: country.paiNombre,
      }));
      setCountryOptions(options);
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    fetchTypeService().then((data) => {
      const options = data.map((item) => ({
        value: item.tseId,
        label: `${item.tseNombre} ${item.tseDescripcion} `,
      }));
      setTypeServiceOptions(options);
    });
  }, []);
  useEffect(() => {
    fechtClients().then((data)=>{
      const options = data.map((item) => ({
        value: item.cliId,
        label: item.cliNombre,
      }));
      setAccountOptions(options);
    });
  }, []);
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    //console.log(`Selected ${fieldName}:`, selectedValue);
    setFormData((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
    if (fieldName == "cliId") {
      fetchPersonGetbyIdClient(selectedValue).then((person) => {
        const options = person.data.map((item) => ({
          value: item.id,
          label: item.perNombres + " " + item.perApellidoPaterno,
        }));
        setContactOptions(options);
      });
    }
  };
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };
  if (idService != null && !isNaN(idService)) {
    useEffect(() => {
      fetchServiceById(
        idService,
        t,
        setFormData,
        router.push
      );
    }, [idService]);
  }
  useEffect(() => {
    setCorrelativo(formData.pryId);
  }, [formData.pryId]);
  const cancel = () => {
    router.push("/business/closeServices/search");
  };
  const openFileDialog = (index) => {
    fileInputRefs[index].current.click();
  };
  const goContactCreate = () => {
    router.push("/contact/create");
  };
  const fileInputRefs = [useRef(null), useRef(null)];
  const calculateEndDate = () => {
    const { startDate, months } = formData;
    try {
      if (months < 1 || months > 60) {
        return; // No actualices el estado si el valor está fuera del rango
      }
      if (startDate && months) {
        const startDateCopy = new Date(startDate);
        const parsedMonths = parseInt(months, 10);
        if (!isNaN(parsedMonths)) {
          const startDateCopy = new Date(startDate);
          const parsedMonths = parseInt(months, 10);
          if (!isNaN(parsedMonths)) {
            startDateCopy.setMonth(startDateCopy.getMonth() + parsedMonths);
            setFormData((prevData) => ({
              ...prevData,
              endDate: startDateCopy, // Aquí actualiza endDate como un objeto Date
            }));
          }
        }
      } else {
        // Si uno de los campos no está lleno o es inválido, borra la fecha de finalización
        setFormData((prevData) => ({
          ...prevData,
          endDate: null,
        }));
      }
    } catch (error) {
      console.log("Error calculando fecha estimada" + error);
    }
  };
  useEffect(() => {
    if (session) {
      setFormData((prevData) => ({
        ...prevData,
        kamId: session.user.persona.id,
      }));
    }
  }, [session]);
  useEffect(() => {
    calculateEndDate();
  }, [formData.startDate, formData.months]);
  const handleSubmit = handleFormSubmit(
    formData,
    t,
    router.push,
    isEdit,
    setFormData
  );
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={!isCreate && !isEdit ? true : false}>
          <div className="d-flex justify-content-between align-items-center mt-2">
            {isCreate && <h4>{`${t.Common.create} ${t.business.title}`}</h4>}
            {!isCreate && (
              <h4>
                {isEdit
                  ? `${t.Common.edit} ${t.business.title}`
                  : t.business.title}
              </h4>
            )}
            <div className="col-sm-2 text-end">
              <h6>
                {t.Common.correlative} {t.business.title}{" "}
                {correlativo === 0 ? "N/A" : correlativo}
              </h6>
            </div>
          </div>

          <div className="mt-3">
            <div className="mb-3 row align-items-center">
              <label htmlFor="kamId" className="col-sm-1 col-form-label">
                {t.Account.KAM}
              </label>
              <div className="col-sm-3">
                {session && (
                  <input
                    type="hidden"
                    className="form-control"
                    id="kamId"
                    name="KamId"
                    value={session.user.persona.id}
                    onChange={handleInputChange(formData, setFormData)}
                    disabled
                  />
                )}
                <span className="form-control">
                  {session
                    ? `${session.user.persona.perNombres} ${session.user.persona.perApellidoPaterno}`
                    : ""}
                </span>
              </div>
              <label htmlFor="closeDate" className="col-sm-2 col-form-label">
                {t.Ficha.table.business.dateEnd}
              </label>
              <div className="col-sm-3">
                <MyDatePicker
                  selectedDate={formData.closeDate}
                  onChange={(date) =>
                    setFormData({ ...formData, closeDate: date })
                  }
                  title={t.Common.date}
                />
              </div>
              <SelectField
                label={t.Account.country}
                options={isLoading ? [] : countryOptions}
                preOption={t.Account.select}
                labelClassName="col-sm-1 col-form-label"
                divClassName="col-sm-2"
                onChange={(e) => handleSelectChange(e, "paiId")}
                selectedValue={formData.paiId}
              />
            </div>

            <div className=" mb-3 row align-items-center">
              <SelectField
                label={t.Account.name}
                options={accountOptions}
                preOption={t.Account.select}
                labelClassName="col-sm-1 col-form-label"
                divClassName="col-sm-3"
                onChange={(e) => handleSelectChange(e, "cliId")}
                selectedValue={formData.cliId}
              />
              <div className="col-sm-2">
                <button type="button" className="badge btn btn-primary">
                  {t.Common.request} (+){" "}
                </button>
              </div>
              <label htmlFor="pryNombre" className="col-sm-1 col-form-label">
                {t.Account.business_name}
              </label>
              <div className="col-sm-5">
                <input
                  type="text"
                  className="form-control"
                  id="pryNombre"
                  name="pryNombre"
                  value={formData.pryNombre}
                  onChange={handleInputChange(formData, setFormData)}
                />
              </div>
            </div>

            <div className=" mb-3 row align-items-center">
              <SelectField
                label={t.Common.contact}
                options={contactOptions}
                preOption={t.Account.select}
                labelClassName="col-sm-1 col-form-label"
                divClassName="col-sm-3"
                onChange={(e) => handleSelectChange(e, "perId")}
                selectedValue={formData.perId}
              />
              <div className="col-sm-2">
                <button
                  type="button"
                  className="badge btn btn-primary"
                  onClick={goContactCreate}
                >
                  {t.Common.add} (+)
                </button>
              </div>
              <SelectField
                label={`${t.Account.type} ${t.Account.business}`}
                options={typeServiceOptions}
                preOption={t.Account.select}
                labelClassName="col-sm-1 col-form-label"
                divClassName="col-sm-3"
                onChange={(e) => handleSelectChange(e, "tseId")}
                selectedValue={formData.tseId}
              />
            </div>

            <div>
              <div className="mb-3 row align-items-center">
                <label
                  htmlFor="confirmclient"
                  className="col-sm-1 col-form-label"
                >
                  {t.Common.confirm} {t.Common.client}
                </label>
                <div className="col-sm-3">
                  <input
                    type="text"
                    className="form-control"
                    id="confirmclient"
                    value={formData.file1 ? formData.file1.name : "N/A"}
                    readOnly
                    onClick={() => openFileDialog(0)} // Abre el cuadro de diálogo del primer archivo
                    accept=".pdf, .jpg, .jpeg, .png"
                    disabled
                  />
                  <input
                    type="file"
                    ref={fileInputRefs[0]}
                    id="file1"
                    name="file1"
                    onChange={(event) => handleFileChange(event, 0)} // Maneja el primer archivo
                    style={{ display: "none" }}
                  />
                </div>
                <div className="col-sm-2">
                  <button
                    type="button"
                    className="badge btn btn-success"
                    onClick={() => openFileDialog(0)} // Abre el cuadro de diálogo del primer archivo
                  >
                    {t.Common.uploadFile}
                  </button>
                </div>
                <label htmlFor="proposal" className="col-sm-1 col-form-label">
                  {t.Common.proposal} {t.Common.accepted}
                </label>
                <div className="col-sm-3">
                  <input
                    type="text"
                    className="form-control"
                    id="proposal"
                    value={formData.file2 ? formData.file2.name : "N/A"}
                    readOnly
                    onClick={() => openFileDialog(1)} // Abre el cuadro de diálogo del segundo archivo
                    accept=".pdf, .jpg, .jpeg, .png"
                    disabled
                  />
                  <input
                    type="file"
                    ref={fileInputRefs[1]}
                    id="file2"
                    name="file2"
                    onChange={(event) => handleFileChange(event, 1)} // Maneja el segundo archivo
                    style={{ display: "none" }}
                  />
                </div>
                <div className="col-sm-2">
                  <button
                    type="button"
                    className="badge btn btn-success"
                    onClick={() => openFileDialog(1)} // Abre el cuadro de diálogo del segundo archivo
                  >
                    {t.Common.uploadFile}
                  </button>
                </div>
              </div>
            </div>
            <hr />

            <div className="mb-3 row align-items-center">
              <label
                htmlFor="estimatedStartDate"
                className="col-sm-1 col-form-label"
              >
                {t.business.estimatedStartDate}
              </label>
              <div className="col-sm-2">
                <MyDatePicker
                  selectedDate={formData.startDate}
                  onChange={(date) =>
                    setFormData({ ...formData, startDate: date })
                  }
                  title={t.Common.date}
                />
              </div>
              <label htmlFor="months" className="col-sm-1 col-form-label">
                {t.business.estimatedTerm}
              </label>
              <div className="col-sm-2">
                <input
                  type="number"
                  className="form-control"
                  id="months"
                  name="months"
                  min="1"
                  max="60"
                  value={formData.months || ""}
                  onChange={handleInputChange(formData, setFormData)}
                />
              </div>
              <label htmlFor="endDate" className="col-sm-2 col-form-label">
                {t.business.estimatedClosingDate}
              </label>
              <div className="col-sm-2">
                <MyDatePicker
                  selectedDate={formData.endDate}
                  onChange={(date) =>
                    setFormData({ ...formData, endDate: date })
                  }
                  isRead={true}
                  title={t.Common.date}
                />
              </div>
            </div>
          </div>
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
        </fieldset>
        <TableCommon
          columns={columns}
          noResultsFound={t.Common.noResultsFound}
          data={tablaCommon}
          title={t.business.agreedRate}
          search={t.Account.table.search}
        />
        <div className="d-flex justify-content-end mb-3">
          {isCreate || isEdit ? (
            <button type="submit" className="btn btn-primary m-2">
              {isEdit ? t.Common.edit : t.Common.saveButton}
            </button>
          ) : (
            <></>
          )}
          {/* <button type="button" className="btn btn-danger m-2" onClick={cancel}>
            {isCreate ? t.Common.cancel : t.Common.goBack}
          </button> */}
        </div>
      </form>
      {idService && (
        <>
          <hr />
          <ProfessionalForm t={t} />
          <div className="d-flex justify-content-end mb-3">
            <button
              type="button"
              className="btn btn-danger m-2"
              onClick={cancel}
            >
              {isCreate ? t.Common.cancel : t.Common.goBack}
            </button>
          </div>
        </>
      )}
    </>
  );
}
export default FormService;
