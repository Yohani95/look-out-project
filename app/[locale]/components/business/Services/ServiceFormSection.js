import React, { useState, useEffect, useRef } from "react";
import {
  handleSelectChange,
  handleInputChange,
} from "@/app/[locale]/utils/Form/UtilsForm";
import SelectField from "../../common/SelectField";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import { useSession } from "next-auth/react";
import { fetchPersonGetbyIdClient } from "@/app/[locale]/utils/person/UtilsPerson";
import { Tooltip } from "react-tooltip";
import { addMonths } from "date-fns";
function ServiceFormSection({
  proyectoModel,
  setProyecto,
  t,
  setFormData,
  formData,
  data,
}) {
  //========DECLARACION DE VARIABLES ===============
  const [contactOptions, setContactOptions] = useState([]);
  const fileInputRefs = [useRef(null), useRef(null)];
  const { data: session, status } = useSession();
  const openFileDialog = (index) => {
    fileInputRefs[index].current.click();
  };
  const daysArray = Array.from({ length: 31 }, (_, index) => {
    const day = index + 1;
    return { label: day.toString(), value: day };
  });
  /*
     =================================================================================
     SECCION DE USSEFFECT
     =================================================================================
  */
  useEffect(() => {
    if (session) {
      setProyecto((prevData) => ({
        ...prevData,
        kamId: session.user.persona.id,
      }));
    }
  }, [session]);
  useEffect(() => {
    fetchPersonGetbyIdClient(proyectoModel.pryIdCliente).then((person) => {
      const options = person?.data?.map((item) => ({
        value: item.id,
        label: item.perNombres + " " + item.perApellidoPaterno,
      }));
      setContactOptions(options);
    });
  }, [proyectoModel.pryIdCliente]);
  useEffect(() => {
 calculateEndDate();
  }, [proyectoModel.months,proyectoModel.pryFechaInicioEstimada]);
  //=======FIN SECCION DE USSEFFECT===============
  /*
     =================================================================================
     Seccion Funciones de componente
     =================================================================================
  */
  const goContactCreate = () => {
    router.push("/contact/create");
  };
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };
  const calculateEndDate = () => {
    const { months, pryFechaInicioEstimada } = proyectoModel;
    
    if (!months || !pryFechaInicioEstimada) {
      return; // No calcular si no hay datos suficientes
    }
  
    const endDate = addMonths(pryFechaInicioEstimada, parseInt(months, 10));
  
    setProyecto({
      ...proyectoModel,
      pryFechaCierreEstimada: endDate,
    });
  };
  return (
    <>
      <div className="mb-3 row align-items-center">
        <label className="col-sm-1 col-form-label">{t.Account.KAM}</label>
        <div className="col-sm-3">
          <span className="form-control">
            {session 
              ? `${session.user.persona.perNombres} ${session.user.persona.perApellidoPaterno}`
              : ""}
          </span>
        </div>
        <label className="col-sm-2 col-form-label">
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
          onChange={(e) => handleSelectChange(e, "paisId", setProyecto)}
          selectedValue={proyectoModel.paisId}
        />
      </div>

      <div className=" mb-3 row align-items-center">
        <SelectField
          label={t.Account.name}
          options={data.clientes}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, "pryIdCliente", setProyecto)}
          selectedValue={proyectoModel.pryIdCliente}
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
            value={proyectoModel.pryNombre}
            onChange={handleInputChange(proyectoModel, setProyecto)}
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
          onChange={(e) => handleSelectChange(e, "pryIdContacto", setProyecto)}
          selectedValue={proyectoModel.pryIdContacto}
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
          options={data.tipoServicios}
          preOption={t.Account.select}
          className="my-contacto"
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, "tseId", setProyecto)}
          selectedValue={proyectoModel.tseId}
        />
      </div>

      <div>
        <div className="mb-3 row align-items-center">
          <label htmlFor="confirmclient" className="col-sm-1 col-form-label">
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
        <label className="col-sm-1 col-form-label">
          {t.business.estimatedStartDate}
        </label>
        <div className="col-sm-2">
          <MyDatePicker
            selectedDate={proyectoModel.pryFechaInicioEstimada}
            onChange={(date) =>
              setProyecto({
                ...proyectoModel,
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
            value={proyectoModel.months || ""}
            onChange={handleInputChange(proyectoModel, setProyecto)}
          />
        </div>
        <label className="col-sm-2 col-form-label">
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
        <SelectField
          label={t.project.datecut}
          options={daysArray}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, "fechaCorte", setProyecto)}
          selectedValue={proyectoModel.fechaCorte}
        />
      </div>
    </>
  );
}

export default ServiceFormSection;
