"use client";
import React, { useState, useEffect } from "react";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import ErroData from "@/app/[locale]/components/common/ErroData";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import { Tooltip } from "react-tooltip";
//import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  FaPlus,
  FaTimes,
  FaToggleOff,
  FaToggleOn,
  FaCheck,
} from "react-icons/fa";
import { useFormik } from "formik";
import {
  handleDelete,
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
import { Constantes } from "@/app/api/models/common/Constantes";
import {
  participanteApiUrl,
  personTipoPersonaApiUrl,
} from "@/app/api/apiConfig";
import ParticipanteForm from "../proyectoParticipante/ParticipanteForm";
import ProyectoParticipante from "@/app/api/models/proyecto/ProyectoParticipante";
import { handleFormSubmit } from "@/app/[locale]/utils/Form/UtilsForm";
import SelectField from "../../common/SelectField";
import PeriodosCreate from "./periodos/PeriodosCreate";
import PeriodosProyecto from "@/app/api/models/proyecto/PeriodosProyecto";
function ProfessionalForm({ isEdit, idService, t, perfiles, proyecto }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tablaCommon, setTablaCommon] = useState([]);
  const [data, setData] = useState([]);
  const [perfilOptions, setPerfilOptions] = useState([]);
  const [periodo, setPeriodo] = useState("");
  const [periodoModel, setPeriodoModel] = useState(new PeriodosProyecto());
  const [professionals, setProfessionalsOptions] = useState([]);
  const router = useRouter();
  const apiurl = {
    edit: participanteApiUrl,
    create: participanteApiUrl,
  };
  const columns = [
    { title: "ID", key: "idParticipante" },
    { title: t.Common.rut, key: "perIdNacional" },
    { title: t.Common.name, key: "perNombre" },
    { title: t.Common.profile, key: "perfil" },
    { title: t.Common.dateAssignment, key: "fechaAsignacion" },
    { title: t.project.dateEnd, key: "fechaTermino" },
    { title: t.Common.fee, key: "perTarifa" },
    { title: t.Common.status, key: "estado" },
    {
      title: t.Account.action, // Título de la columna de acciones
      key: "actions",
      render: (item) => (
        <>
          <Button size="sm" variant="link" disabled={compararFechasPeriodo()}>
            {item.status == true ? (
              <>
                <FaToggleOff
                  size={16}
                  className="my-anchor-element" // Clase para el elemento ancla
                  onClick={() => handleUnAssing(item.data, t)} // Acción del botón
                />
                <Tooltip anchorSelect=".my-anchor-element" place="top">
                  {t.Common.unassign}
                </Tooltip>
              </>
            ) : (
              <>
                <FaToggleOn
                  size={16}
                  className="my-anchor" // Clase para el elemento ancla
                  onClick={() => handleUnAssing(item.data, t, false)} // Acción del botón
                />
                <Tooltip anchorSelect=".my-anchor" place="top">
                  {t.Common.reassign}
                </Tooltip>
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="link"
            onClick={() =>
              router.push(`/service/createNovelty/${idService}/${item.id}`)
            }
          >
            <FaPlus size={16} className="my-novedad" />
            <Tooltip anchorSelect=".my-novedad" place="top">
              {t.Nav.services.createNovelty}
            </Tooltip>
          </Button>
        </>
      ),
    },
  ];
  const fetchData = async () => {
    try {
      await fetchParticipanteByIdProyecto(idService).then((profesionales) => {
        const nuevosElementosTabla = profesionales.data.map((element) => ({
          id: element.persona.id,
          idParticipante: element.ppaId,
          perTarifa: element.perTarifa,
          perfil: element.perfil.prf_Nombre,
          perIdNacional: formatearRut(element.persona.perIdNacional),
          perNombre: new Persona(element.persona).getNombreCompleto(),
          fechaAsignacion: element.fechaAsignacion
            ? new Date(element.fechaAsignacion).toLocaleDateString()
            : "N/A",
          fechaTermino: element.fechaTermino
            ? new Date(element.fechaTermino).toLocaleDateString()
            : "N/A",
          status: element.estado,
          data: element,
          estado: element.estado ? (
            <FaCheck style={{ color: "green" }} />
          ) : (
            <FaTimes style={{ color: "red" }} />
          ),
        }));
        setTablaCommon([...nuevosElementosTabla]);
        setData([...nuevosElementosTabla]);
        if (periodo === "") {
          const periodosTotal = calculatePeriods();
          setPeriodo(periodosTotal[0]?.value);
        } else {
          setPeriodo(periodo);
        }
      });
    } catch (error) {
      setError(true);
    }
  };
  const fetchProfessionals = async () => {
    const response = await fetch(
      `${personTipoPersonaApiUrl}/${Constantes.TipoPersona.PERSONA_PROFESIONAL}`
    );
    let personas = [new Persona()];
    personas = await response.json();
    const options = personas.map((persona) => {
      return new Persona(persona).getSelectOptions();
    });
    setProfessionalsOptions(options);
  };
  useEffect(() => {
    fetchProfessionals();
    fetchData();
    setIsLoading(false);
  }, []);
  useEffect(() => {
    const options = perfiles.map((item) => ({
      value: item.tcId,
      label: item.tcPerfilAsignado,
    }));
    setPerfilOptions(options);
  }, [perfiles]);
  const handleUnAssing = async (item, t, unassing = true) => {
    try {
      const participante = new ProyectoParticipante(
        item.ppaId,
        item.pryId,
        item.perId,
        item.carId,
        item.perTarifa,
        item.prfId,
        item.fechaAsignacion,
        item.fechaTermino,
        item.estado
      );
      if (unassing) {
        participante.estado = 0;
      }
      await handleFormSubmit(
        participante,
        t,
        null,
        true,
        null,
        apiurl,
        item.ppaId
      );
      await fetchData().then(() => {
        //handle(periodo);
      });
    } catch (error) {
      console.error("Ocurrió un error o la eliminación se canceló:", error);
    }
  };
  const validateRules = ProyectoParticipante.validationRules(t);
  const formik = useFormik({
    initialValues: new ProyectoParticipante(),
    validateRules,
    //validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Utiliza una variable para almacenar la función handleFormSubmit
        console.log(perfiles)
        values.perTarifa = perfiles.find(
          (tarifario) => tarifario.tcId == values.tarifarioId
        )?.tcTarifa;
        values.prfId = perfiles.find(
          (tarifario) => tarifario.tcId == values.tarifarioId
        )?.tcPerfilAsignadoId;
        values.pryId = idService;
        await handleFormSubmit(values, t, null, false, null, apiurl);
        fetchData();
      } catch (error) {
        console.error("Error in handleFormSubmit:", error);
      } finally {
        EditAction();
        setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
      }
    },
  });
  const calculatePeriods = () => {
    const startDate = new Date(proyecto.pryFechaInicioEstimada);
    const endDate = new Date(proyecto.pryFechaCierreEstimada);
    const cutoffDate = parseInt(proyecto.fechaCorte, 10);
    
    const periods = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth();
      let daysInMonth = new Date(year, month + 1, 0).getDate(); // Obtener el número de días en el mes
      
      // Determinar el día límite según el mes y año actual
      let periodEndDate;
      if (cutoffDate > daysInMonth) {
        // Si el día de corte excede los días del mes, usar el último día del mes
        periodEndDate = new Date(year, month, daysInMonth);
      } else {
        // Si el día de corte es válido para el mes, usarlo
        periodEndDate = new Date(year, month, cutoffDate);
      }
  
      // Si la fecha de corte es antes de la fecha de inicio, ajustar al próximo mes
      if (periodEndDate < currentDate) {
        month++;
        if (month > 11) {
          month = 0;
          year++;
        }
        daysInMonth = new Date(year, month + 1, 0).getDate();
        periodEndDate = new Date(year, month, Math.min(cutoffDate, daysInMonth));
      }
  
      // Si la fecha de corte excede la fecha de cierre, ajustar al día de cierre
      if (periodEndDate > endDate) {
        periodEndDate = new Date(endDate);
      }
      
      const formattedStartDate = currentDate.toLocaleDateString();
      const formattedEndDate = periodEndDate.toLocaleDateString();
      
      periods.push({
        key: `${periods.length + 1}`,
        label: `${formattedStartDate} - ${formattedEndDate}`,
        value: `${currentDate.toISOString()} - ${periodEndDate.toISOString()}`,
      });
      
      // Establecer el día después del final del período actual como base para el próximo periodo
      currentDate = new Date(periodEndDate.getFullYear(), periodEndDate.getMonth(), periodEndDate.getDate() + 1);
    }
    return periods;
  };
  
  
  
  const handle = (selectedOption) => {
    if (selectedOption == ""|| selectedOption==null) {
      setTablaCommon(data); // Establecer la data completa
      return;
    }
    const [startDateStr, endDateStr] = selectedOption.split(" - ");
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const filteredData = data.filter((item) => {
      const fechaAsignacion = new Date(item.data.fechaAsignacion);
      const fechaTermino = item.data.fechaTermino;
  
      if (fechaTermino === 'N/A' || fechaTermino === null) {
        // Si Fecha Término es 'N/A' o nula, verificar Fecha Asignación en el rango
        return fechaAsignacion <= endDate;
      }
  
      const fechaTerminoDate = new Date(fechaTermino);
  
      if (fechaAsignacion <= endDate && fechaTerminoDate >= startDate) {
        return true; // El rango de fechas se superpone, incluir elemento
      }
  
      return false;
    });

    const numeroParticipantes = filteredData.length;
    const totalTarifa = filteredData.reduce((total, item) => total + item.perTarifa, 0);
    // Actualizar el objeto periodoModel con los nuevos datos
    const updatedPeriodoModel = new PeriodosProyecto({
      pryId: idService, // Establecer el ID del proyecto
      fechaPeriodoDesde: startDate, // Establecer la fecha desde
      fechaPeriodoHasta: endDate, // Establecer la fecha hasta
      estado: 0, // Estado en 0
      monto: totalTarifa, // Monto en 0
      numeroProfesionales: numeroParticipantes, // Establecer el número de profesionales
    });
    setPeriodoModel(updatedPeriodoModel);
    setTablaCommon(filteredData);
  };
  useEffect(() => {
    handle(periodo); // Llamar a handle cuando periodo cambie
  }, [periodo]);
  const compararFechasPeriodo = () => {
    if (!periodo || periodo==="") {
      return true; // Si periodo es null o undefined, devuelve false
    }

    const [_, endDateStr] = periodo.split(" - "); // Suponiendo que el formato es 'startDate - endDate'
    const endDate = new Date(endDateStr);
    const fechaActual = new Date(); // Obtener la fecha actual

    return endDate < fechaActual; // Devuelve true si endDate es mayor que la fecha actual, de lo contrario, false
  };
  function isButtonDisabled() {
    if (tablaCommon.length === 0) {
      return true;
    }
    if (!periodo) {
      return true; // Si periodo es null o undefined, devuelve false
    }
    //return compararFechasPeriodo(); // Si ninguna condición se cumple, el botón se deja habilitado
  }
  return (
    <>
      <BoxInfo title={t.Common.professionals} startShow={true}>
        <div className="d-flex justify-content-end container mb-3">
          <SelectField
            label={`${t.Common.period}`}
            options={calculatePeriods()}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-2"
            onChange={
              (e) => setPeriodo(e.target.value) // Actualizar el estado del periodo seleccionado
            }
            selectedValue={periodo}
          />
        </div>
        <form
          onSubmit={(e) => {
            formik.handleSubmit(e);
          }}
        >
          <ParticipanteForm
            professionals={professionals}
            perfiles={perfilOptions}
            t={t}
            formData={formik.values}
            setFormData={formik.setValues}
            formik={formik}
          />
          <div className="d-flex justify-content-end mb-3">
            <button
              type="submit"
              className="text-end  btn btn-primary"
              disabled={compararFechasPeriodo()}
            >
              {t.Common.add}{" "}
            </button>
          </div>
        </form>
        {isLoading ? (
          <LoadingData loadingMessage={t.Common.loadingData} />
        ) : error ? (
          <ErroData message={t.Common.errorMsg} />
        ) : tablaCommon.length == [] ? ( // Verifica si no hay datos
          <div className="text-center justify-content-center align-items-center">
            <h4>{t.Common.professionals}</h4> {t.Common.noData}
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
        <PeriodosCreate t={t} periodo={periodoModel} isButtonDisabled={isButtonDisabled} idService={idService}/>
      </BoxInfo>
    </>
  );
}

export default ProfessionalForm;
