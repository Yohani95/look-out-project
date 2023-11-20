"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import { fechtClients } from "@/app/[locale]/utils/client/ClientFormLogic";
import SelectField from "@/app/[locale]/components/common/SelectField";
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
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import BoxInfo from "@/app/[locale]/components/common/BoxInfo";
import ProfessionalForm from "./ProfessionalForm";
import Proyecto from "@/app/api/models/proyecto/Proyecto";
import { useFormik } from "formik";
import { EditAction } from "../../admin/professionals/ProfessionalsActions";
function FormService({ locale, isEdit, isCreate, idService, data }) {
  //========DECLARACION DE VARIABLES ===============
  const { data: session, status } = useSession();
  const [contactOptions, setContactOptions] = useState([]);
  const [accountOptions, setAccountOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [correlativo, setCorrelativo] = useState([]);
  const [tablaCommon, setTablaCommon] = useState([]);
  const [proyectoModel, setProyecto] = useState(new Proyecto());
  const fileInputRefs = [useRef(null), useRef(null)];
  const [formData, setFormData] = useState({
    pryId: 0,
    cliId: 0,
    pryNombre: "",
    perId: 0,
    tseId: 0,
    paisId: 0,
    kamId: 0,
    file1: null,
    file2: null,
    endDate: "",
    startDate: "",
    closeDate: null,
    months: null,
    idMon: 0,
    idPerfil: 1,
    fee: 0,
    base: "",
    listPerfil: [],
    personData: "",
    client: "",
    perfiles: [],
  });
  let t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const timeOptions = [
    { value: 1, label: t.time.month },
    { value: 2, label: t.time.week },
    { value: 3, label: t.time.hour },
    // Agrega más opciones según sea necesario
  ];
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
  //========FIN DECLARACION DE VARIABLES ===============
  /*
   =================================================================================
   SECCION DE USSEFFECT
   =================================================================================
*/
  useEffect(() => {
    if (isCreate) {
      fetchServiceLastId(t, router.push).then((result) => {
        setCorrelativo(result.data + 1);
      });
    }
  }, []);
  useEffect(() => {
    if (isEdit || isCreate) {
      fechtClients().then((data) => {
        const options = data.map((item) => ({
          value: item.cliId,
          label: item.cliNombre,
        }));
        setAccountOptions(options);
        setIsLoading(false);
      });
    }
  }, []);
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    setFormData((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
    // if (fieldName == "cliId") {
    //   fetchPersonGetbyIdClient(selectedValue).then((person) => {
    //     const options = person.data.map((item) => ({
    //       value: item.id,
    //       label: item.perNombres + " " + item.perApellidoPaterno,
    //     }));
    //     setContactOptions(options);
    //   });
    // }
  };
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };
  useEffect(() => {
    setCorrelativo(formData.pryId);
  }, [formData.pryId]);
  useEffect(() => {
    if (session) {
      setFormData((prevData) => ({
        ...prevData,
        kamId: session.user.persona.id,
      }));
    }
  }, [session]);
  useEffect(() => {
    fetchPersonGetbyIdClient(proyectoModel.pryIdCliente).then((person) => {
      console.log(person);
      const options = person?.data?.map((item) => ({
        value: item.id,
        label: item.perNombres + " " + item.perApellidoPaterno,
      }));
      setContactOptions(options);
    });
  }, [proyectoModel.pryIdCliente]);
  useEffect(() => {
    calculateEndDate();
  }, [formData.startDate, formData.months]);
  if (idService != null && !isNaN(idService)) {
    const fetchData = async () => {
      try {
        await fetchServiceById(
          idService,
          t,
          setFormData,
          router.push,
          setTablaCommon,
          tablaCommon,
          setProyecto
        );
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
  }
  //=======FIN SECCION DE USSEFFECT===============
  /*
   =================================================================================
   Seccion Funciones de componente
   =================================================================================
*/
  const handleAddToTablaCommon = () => {
    // Obtén los labels correspondientes a los ids seleccionados
    const idPerfilLabel = data.perfiles.find(
      (option) => option.value == formData.idPerfil
    )?.label;
    const idMonLabel = data.monedas.find(
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
      base:
        formData.base === 1
          ? t.time.mes
          : formData.base === 3
          ? t.time.hour
          : t.time.week,
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
      const idPerfilLabel = data.perfiles.find(
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
  const cancel = () => {
    router.back();
  };
  const openFileDialog = (index) => {
    fileInputRefs[index].current.click();
  };
  const goContactCreate = () => {
    router.push("/contact/create");
  };
  const calculateEndDate = () => {
    const { months } = formData;
    const { pryFechaInicioEstimada: startDate } = proyectoModel;

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
            setProyecto((prevData) => ({
              ...prevData,
              pryFechaCierreEstimada: startDateCopy, // Aquí actualiza endDate como un objeto Date
            }));
          }
        }
      } else {
        // Si uno de los campos no está lleno o es inválido, borra la fecha de finalización
        setProyecto((prevData) => ({
          ...prevData,
          pryFechaCierreEstimada: null,
        }));
      }
    } catch (error) {
      console.log("Error calculando fecha estimada" + error);
    }
  };
  const validationSchema = Proyecto.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new Proyecto(proyectoModel),
    validationSchema,
    //validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Submitting form with values:", values);
      try {
        // Utiliza una variable para almacenar la función handleFormSubmit
        // Utiliza una variable para almacenar la función handleFormSubmit
        const proyectoDTO = {
          proyecto: values,
          TarifarioConvenio: formData.listPerfil,
        };
        const data = new FormData();
        data.append("proyectoJson", JSON.stringify(proyectoDTO));
        // Agrega los archivos
        data.append("files", formData.file1);
        data.append("files", formData.file2);
        console.log(data);
        return;
        handleFormSubmit(data, t, router.push, isEdit);
        console.log("After handleFormSubmit");
        // Ejecuta la función almacenada
        console.log("After handleFormSubmit");
        // Ejecuta la función almacenada
        console.log("After handleFormSubmit");
      } catch (error) {
        console.error("Error in handleFormSubmit:", error);
      } finally {
        EditAction();
        setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
      }
    },
  });
  return (
    <>
      {isLoading ? (
        <LoadingData loadingMessage={t.Common.loadingData} />
      ) : (
        <>
          <form
            onSubmit={(e) => {
              formik.handleSubmit(e);
            }}
          >
            <fieldset disabled={!isCreate && !isEdit ? true : false}>
              <div className="d-flex justify-content-between align-items-center mt-2">
                {isCreate && (
                  <h4>{`${t.Common.create} ${t.business.title}`}</h4>
                )}
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
                  <label
                    htmlFor="closeDate"
                    className="col-sm-2 col-form-label"
                  >
                    {t.Ficha.table.business.dateEnd}
                  </label>
                  <div className="col-sm-3">
                    <MyDatePicker
                      selectedDate={proyectoModel.pryFechaCierre}
                      onChange={(date) =>
                        setProyecto({ ...proyectoModel, pryFechaCierre: date })
                      }
                      title={t.Common.date}
                    />
                  </div>
                  <SelectField
                    label={t.Account.country}
                    options={data.paises}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-2"
                    onChange={(e) => handleSelectChange(e, "paisId")}
                    selectedValue={proyectoModel.paisId}
                  />
                </div>

                <div className=" mb-3 row align-items-center">
                  {!isCreate && !isEdit ? (
                    <>
                      <label
                        htmlFor="cliNombre"
                        className="col-sm-1 col-form-label"
                      >
                        {t.Account.name}
                      </label>
                      <div className="col-sm-3">
                        <input
                          type="text"
                          className="form-control"
                          id="cliNombre"
                          name="cliNombre"
                          value={proyectoModel.cliente.cliNombre}
                          onChange={handleInputChange(
                            proyectoModel,
                            setProyecto
                          )}
                        />
                      </div>
                    </>
                  ) : (
                    <SelectField
                      label={t.Account.name}
                      options={accountOptions}
                      preOption={t.Account.select}
                      labelClassName="col-sm-1 col-form-label"
                      divClassName="col-sm-3"
                      onChange={(e) => handleSelectChange(e, "pryIdCliente")}
                      selectedValue={proyectoModel.pryIdCliente}
                    />
                  )}
                  <div className="col-sm-2">
                    <button type="button" className="badge btn btn-primary">
                      {t.Common.request} (+){" "}
                    </button>
                  </div>
                  <label
                    htmlFor="pryNombre"
                    className="col-sm-1 col-form-label"
                  >
                    {t.Account.business_name}
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      className="form-control"
                      id="pryNombre"
                      name="pryNombre"
                      value={proyectoModel.pryNombre}
                      onChange={handleInputChange(proyectoModel, setProyecto)}
                    />
                  </div>
                </div>

                <div className=" mb-3 row align-items-center">
                  {!isCreate && !isEdit ? (
                    <>
                      <label
                        htmlFor="personData"
                        className="col-sm-1 col-form-label"
                      >
                        {t.Common.contact}
                      </label>
                      <div className="col-sm-3">
                        <input
                          type="text"
                          className="form-control"
                          id="personData"
                          name="personData"
                          value={proyectoModel.contacto.getNombreCompleto()}
                          //onChange={handleInputChange(proyectoModel, setProyecto)}
                        />
                      </div>
                    </>
                  ) : (
                    <SelectField
                      label={t.Common.contact}
                      options={contactOptions}
                      preOption={t.Account.select}
                      labelClassName="col-sm-1 col-form-label"
                      divClassName="col-sm-3"
                      onChange={(e) => handleSelectChange(e, "pryIdContacto")}
                      selectedValue={proyectoModel.pryIdContacto}
                    />
                  )}

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
                    options={data.tipoServicios}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-3"
                    onChange={(e) => handleSelectChange(e, "tseId")}
                    selectedValue={proyectoModel.tseId}
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
                    <label
                      htmlFor="proposal"
                      className="col-sm-1 col-form-label"
                    >
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
                      selectedDate={proyectoModel.pryFechaInicioEstimada}
                      onChange={(date) =>
                        setProyecto({
                          ...proyectoModel.pryFechaInicioEstimada,
                          pryFechaInicioEstimada: date,
                        })
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
                      selectedDate={proyectoModel.pryFechaCierreEstimada}
                      onChange={(date) =>
                        setProyecto({
                          ...proyectoModel,
                          pryFechaCierreEstimada: date,
                        })
                      }
                      isRead={true}
                      title={t.Common.date}
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label htmlFor="dateCut" className="col-sm-2 col-form-label">
                    {t.project.datecut}
                  </label>
                  <div className="col-sm-2">
                    <MyDatePicker
                      selectedDate={proyectoModel.fechaCorte}
                      onChange={(date) =>
                        setProyecto({ ...proyectoModel, fechaCorte: date })
                      }
                      title={t.Common.date}
                    />
                  </div>
                </div>
                <BoxInfo title={t.business.agreedRate}>
                  <div className="mb-3 row align-items-center ">
                    <SelectField
                      label={t.Common.profile}
                      options={data.perfiles}
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
                        {data.monedas.map((option) => (
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
                  <TableCommon
                    columns={columns}
                    noResultsFound={t.Common.noResultsFound}
                    data={tablaCommon}
                    title={t.business.agreedRate}
                    search={t.Account.table.search}
                  />
                </BoxInfo>
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
              {!idService && (
                <>
                  <button
                    type="button"
                    className="btn btn-danger m-2"
                    onClick={cancel}
                  >
                    {isCreate ? t.Common.cancel : t.Common.goBack}
                  </button>
                </>
              )}
            </div>
          </form>

          {idService && (
            <>
              <hr />
              <ProfessionalForm
                t={t}
                idService={idService}
                perfiles={formData.perfiles}
              />
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
      )}
    </>
  );
}
export default FormService;
