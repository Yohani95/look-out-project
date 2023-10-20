"use client";
import React, { useState, useEffect } from "react";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import SelectField from "@/app/[locale]/components/common/SelectField";
import ErroData from "@/app/[locale]/components/common/ErroData";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { handleInputChange } from "@/app/[locale]/utils/business/UtilsParticipants";
function ProfessionalForm({ idService, t }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tablaCommon, setTablaCommon] = useState([]);
  const [perfilOptions, setPerfilOptions] = useState([]);
  const [formDataJob, setformDataJob] = useState({
    ppaId: 0,
    pyrId: "",
    perId: 0,
    carId: "",
    perTarifa: "",
    prfId: 0,
    perIdNacional: "",
    perNombre: "",
    fechaAsignacion: "",
    perApellidoPaterno: "",
    perApellidoMaterno: "",
  });
  const columns = [
    { title: t.Common.rut, key: "rut" },
    { title: t.Common.name, key: "perNombre" },
    { title: t.Common.profile, key: "perfil" },
    { title: t.Common.dateAssignment, key: "fechaAsignacion" },
    { title: t.Common.fee, key: "perTarifa" },
    {
      title: t.Account.action, // Título de la columna de acciones
      key: "actions",
      // render: (item) => (
      //   <Button size="sm" variant="link">
      //     <FaTrash
      //       size={16}
      //       className=""
      //       onClick={() => handleDeleteItem(item)}
      //     />
      //   </Button>
      // ),
    },
  ];
  const [data, setData] = useState([]);
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    setformDataJob((prevData) => ({
      ...prevData,
      [fieldName]: selectedValue,
    }));
  };
  //   useEffect(() => {
  //     fetchComuna().then((data) => {
  //       const options = data.map((item) => ({
  //         value: item.id,
  //         label: item.nombre,
  //       }));
  //       setPerfilOptions(options);
  //     });
  //   }, []);
  const handleAddToTablaCommon = () => {
    // const typeLabelComuna = comunaOptions.find(
    //   (option) => option.value == formDataAddress.comId
    // )?.label;
    // const typeLabelType = addressOptions.find(
    //   (option) => option.value == formDataAddress.tdirId
    // )?.label;
    // console.log(typeLabelType);
    const perfil = data.find((perfil) =>perfil.id=formDataJob.prfId);
    const nuevoElementoTabla = {
      perTarifa: perfil.fee,
      perfil: perfil.nombre,
      perIdNacional: formDataJob.rut,
      perNombre: formDataJob.perNombre + " " + formDataJob.perApellidoPaterno,
      fechaAsignacion: formDataJob.fechaAsignacion,
    };
    const participanteDTO = {
      proyectoParticipante: {
        pryId: idService,
        prfId: formDataJob.prfId,
        fechaAsignacion: formDataJob.fechaAsignacion,
      },
      persona: {
        perIdNacional: formDataJob.rut,
        perNombre: formDataJob.perNombre,
        perApellidoPaterno: formDataJob.perApellidoPaterno,
        perApellidoMaterno: "",
        prfId: formDataJob.prfId,
      },
    };
    setTablaCommon([...tablaCommon, nuevoElementoTabla]);
  };
  const handleDeleteItem = (participante) => {
    // Encuentra el índice del elemento en tablaCommon que coincide con el emaemail
    const index = tablaCommon.findIndex(
      (element) =>
        element.rut === participante.rut
    );
    if (index !== -1) {
      const updatedTablaCommon = [...tablaCommon];
      updatedTablaCommon.splice(index, 1);
      setTablaCommon(updatedTablaCommon);
    }
  };
  return (
    <>
      <form>
        <h4>{t.Common.professionals}</h4>
        <div className="mb-3 row align-items-center">
          <label htmlFor="perIdNacional" className="col-sm-1 col-form-label">
            {t.Common.rut}
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="perIdNacional"
              name="perIdNacional"
              value={formDataJob.perIdNacional}
              onChange={handleInputChange(formDataJob, setformDataJob)}
              required
            />
          </div>
          <label htmlFor="perNombre" className="col-sm-1 col-form-label">
            {t.Common.name}
          </label>
          <div className="col-sm-2">
            <input
              type="name"
              className="form-control"
              id="perNombre"
              name="perNombre"
              value={formDataJob.perNombre}
              onChange={handleInputChange(formDataJob, setformDataJob)}
            />
          </div>
          <label
            htmlFor="perApellidoPaterno"
            className="col-sm-1 col-form-label"
          >
            {t.Common.lastNames}
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="perApellidoPaterno"
              name="perApellidoPaterno"
              value={formDataJob.perApellidoPaterno}
              onChange={handleInputChange(formDataJob, setformDataJob)}
            />
          </div>
        </div>
        <div className=" mb-3 row align-items-center">
          <SelectField
            label={`${t.Common.profile}`}
            options={perfilOptions}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-2"
            onChange={(e) => handleSelectChange(e, "prfId")}
            selectedValue={formDataJob.prfId}
          />
          <label
            htmlFor="perApellidoMaterno"
            className="col-sm-1 col-form-label"
          >
            {t.Common.dateAssignment}
          </label>
          <div className="col-sm-2">
            <MyDatePicker
              selectedDate={formDataJob.fechaAsignacion}
              onChange={(date) =>
                setformDataJob({ ...formDataJob, fechaAsignacion: date })
              }
              title={t.Common.date}
            />
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
        ) : data == [] ? ( // Verifica si no hay datos
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
      </form>
    </>
  );
}

export default ProfessionalForm;
