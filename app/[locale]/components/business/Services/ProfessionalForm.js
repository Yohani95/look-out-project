"use client";
import React, { useState, useEffect } from "react";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import SelectField from "@/app/[locale]/components/common/SelectField";
import ErroData from "@/app/[locale]/components/common/ErroData";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { Button } from "react-bootstrap";
import { FaTrash, FaPlus } from "react-icons/fa";
import {
  handleInputChange,
  handleDelete,
  handleFormSubmit,
  fetchParticipanteByIdProyecto,
} from "@/app/[locale]/utils/business/UtilsParticipants";
import Persona from "@/app/api/models/admin/Persona";
import { useRouter } from "next/navigation";
import BoxInfo from "@/app/[locale]/components/common/BoxInfo";
import {
  validarRut,
  formatearRut,
  quitarPuntosRut,
} from "@/app/[locale]/utils/Common/UtilsChilePersonas";
function ProfessionalForm({ isEdit, idService, t, perfiles }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tablaCommon, setTablaCommon] = useState([]);
  const [perfilOptions, setPerfilOptions] = useState([]);
  const [addStatus, setAdd] = useState(false);
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
    participantesDTO: [],
    periodo: 0,
  });
  const router = useRouter();
  const columns = [
    { title: "ID", key: "id" },
    { title: t.Common.rut, key: "perIdNacional" },
    { title: t.Common.name, key: "perNombre" },
    { title: t.Common.profile, key: "perfil" },
    { title: t.Common.dateAssignment, key: "fechaAsignacion" },
    { title: t.Common.fee, key: "perTarifa" },
    {
      title: t.Account.action, // Título de la columna de acciones
      key: "actions",
      render: (item) => (
        <>
          <Button size="sm" variant="link">
            <FaTrash
              size={16}
              className=""
              onClick={() => handleDeleteAndItem(item, t)}
            />
          </Button>
          <Button
            size="sm"
            variant="link"
            onClick={() =>
              router.push(`/service/createNovelty/${idService}/${item.id}`)
            }
          >
            <FaPlus size={16} className="" />
          </Button>
        </>
      ),
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
  const fetchData = () => {
    fetchParticipanteByIdProyecto(idService).then((profesionales) => {
      const nuevosElementosTabla = profesionales.data.map((element) => ({
        id: element.persona.id,
        perTarifa: element.perTartifa,
        perfil: element.perfil.prf_Nombre,
        perIdNacional: formatearRut(element.persona.perIdNacional),
        perNombre:
          element.persona.perNombres +
          " " +
          element.persona.perApellidoPaterno +
          " " +
          element.persona.perApellidoMaterno,
        fechaAsignacion: new Date(element.fechaAsignacion).toLocaleDateString(),
      }));

      setTablaCommon([...tablaCommon, ...nuevosElementosTabla]);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const options = perfiles.map((item) => ({
      value: item.perfil.id,
      label: item.perfil.prf_Nombre,
    }));
    setPerfilOptions(options);
  }, [perfiles]);
  const tarifario = perfiles.find(
    (tarifario) => tarifario.perfil.id == formDataJob.prfId
  );
  const handleAddToTablaCommon = () => {
    const index = tablaCommon.findIndex(
      (element) => element.perIdNacional === formDataJob.perIdNacional
    );
    if (index !== -1) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.emailExist,
        type: t.notification.warning.type,
      });
      return;
    }
    const nuevoElementoTabla = {
      perTarifa: tarifario.tcTarifa,
      perfil: tarifario.perfil.prf_Nombre,
      perIdNacional: formatearRut(formDataJob.perIdNacional),
      perNombre:
        formDataJob.perNombre +
        " " +
        formDataJob.perApellidoPaterno +
        " " +
        formDataJob.perApellidoMaterno,
      fechaAsignacion: formDataJob.fechaAsignacion.toLocaleDateString(),
    };
    setTablaCommon([...tablaCommon, nuevoElementoTabla]);
  };

  const handleDeleteItem = (participante) => {
    // Encuentra el índice del elemento en tablaCommon que coincide con el emaemail
    const index = tablaCommon.findIndex(
      (element) => element.perIdNacional === participante.perIdNacional
    );
    if (index !== -1) {
      const updatedTablaCommon = [...tablaCommon];
      updatedTablaCommon.splice(index, 1);
      setTablaCommon(updatedTablaCommon);
    }
  };
  const handleDeleteAndItem = async (item, t) => {
    try {
      const result = await handleDelete(quitarPuntosRut(item.perIdNacional), t);
      if (result == 200) {
        handleDeleteItem(item);
      }
    } catch (error) {
      console.error("Ocurrió un error o la eliminación se canceló:", error);
    }
  };
  const handleSubmit = handleFormSubmit(
    formDataJob,
    t,
    isEdit,
    fetchData,
    tarifario,
    idService
  );
  const generatePeriods = () => {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const twoMonthsAgo = new Date(currentDate);
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    return [
      { key: "1", label: "Último mes", value: lastMonth.toISOString() }, // Puedes cambiar "value" según tus necesidades
      { key: "2", label: "Hace dos meses", value: twoMonthsAgo.toISOString() },
      // Agrega más periodos según sea necesario
    ];
  };
  return (
    <>
      <BoxInfo title={t.Common.professionals} startShow={false}>
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-end container mb-3">
            <SelectField
              label={`${t.Common.period}`}
              options={generatePeriods()}
              preOption={t.Account.select}
              labelClassName="col-sm-1 col-form-label"
              divClassName="col-sm-2"
              onChange={(e) => handleSelectChange(e, "periodo")}
              selectedValue={formDataJob.periodo}
            />
          </div>

          <div className=" mb-3 row align-items-center">
            <SelectField
              label={`${t.Common.professionals}`}
              options={perfilOptions}
              preOption={t.Account.select}
              labelClassName="col-sm-2 col-form-label"
              divClassName="col-sm-2"
              onChange={(e) => handleSelectChange(e, "prfId")}
              selectedValue={""}
            />
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
            <label
              htmlFor="perApellidoMaterno"
              className="col-sm-1 col-form-label"
            >
              {t.project.dateEnd}
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
                type="submit"
                className="text-end badge btn btn-primary"
                onClick={() => {
                  setAdd(true);
                }}
              >
                {t.Common.add} ...{" "}
              </button>
            </div>
          </div>
        </form>
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
      </BoxInfo>
    </>
  );
}

export default ProfessionalForm;
