"use client";
import React, { useState, useEffect } from "react";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import ErroData from "@/app/[locale]/components/common/ErroData";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import { Tooltip } from "react-tooltip";
//import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaPlus, FaToggleOff, FaToggleOn } from "react-icons/fa";
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
function ProfessionalForm({ isEdit, idService, t, perfiles }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tablaCommon, setTablaCommon] = useState([]);
  const [perfilOptions, setPerfilOptions] = useState([]);
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
    //{ title: t.Common.status, key: "estado" },
    {
      title: t.Account.action, // Título de la columna de acciones
      key: "actions",
      render: (item) => (
        <>
          <Button size="sm" variant="link">
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
                  className="my-anchor-element" // Clase para el elemento ancla
                  onClick={() => handleUnAssing(item.data, t, false)} // Acción del botón
                />
                <Tooltip anchorSelect=".my-anchor-element" place="top">
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
  const fetchData = () => {
    try {
      fetchParticipanteByIdProyecto(idService).then((profesionales) => {
        const nuevosElementosTabla = profesionales.data.map((element) => ({
          id: element.persona.id,
          idParticipante: element.ppaId,
          perTarifa: element.perTarifa,
          perfil: element.perfil.prf_Nombre,
          perIdNacional: formatearRut(element.persona.perIdNacional),
          perNombre: new Persona(element.persona).getNombreCompleto(),
          fechaAsignacion: new Date(
            element.fechaAsignacion
          ).toLocaleDateString(),
          fechaTermino:element.fechaTermino || "N/A",
          status: element.estado,
          data: element,
          //estado:element.estado,
        }));
        setTablaCommon([...nuevosElementosTabla]);
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
      value: item.perfil.id,
      label: item.perfil.prf_Nombre,
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
      fetchData();
    } catch (error) {
      console.error("Ocurrió un error o la eliminación se canceló:", error);
    }
  };
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
  const validateRules = ProyectoParticipante.validationRules(t);
  const formik = useFormik({
    initialValues: new ProyectoParticipante(),
    validateRules,
    //validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Utiliza una variable para almacenar la función handleFormSubmit
        values.perTarifa = await perfiles.find(
          (tarifario) => tarifario.perfil.id == values.prfId
        )?.tcTarifa;
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
  return (
    <>
      <BoxInfo title={t.Common.professionals} startShow={false}>
        <div className="d-flex justify-content-end container mb-3">
          <SelectField
              label={`${t.Common.period}`}
              options={generatePeriods()}
              preOption={t.Account.select}
              labelClassName="col-sm-1 col-form-label"
              divClassName="col-sm-2"
              onChange={(e) => handleSelectChange(e, "periodo")}
              //selectedValue={formDataJob.periodo}
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
            <button type="submit" className="text-end  btn btn-primary">
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
      </BoxInfo>
    </>
  );
}

export default ProfessionalForm;
