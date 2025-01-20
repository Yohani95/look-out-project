import React, { useState } from 'react';
import SelectField from '@/app/[locale]/components/common/SelectField';
import { handleSelectChange } from '@/app/[locale]/utils/Form/UtilsForm';
import MyDatePicker from '@/app/[locale]/components/common/MyDatePicker';
import { FormikProps } from 'formik';
import { Form } from 'react-bootstrap';
import PlanificacionProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/PlanificacionProyectoDesarrollo';
import EtapaPlanificacionProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/EtapaPlanificacionProyectoDesarrollo';

interface FormProps {
  planificacionModel: PlanificacionProyectoDesarrollo;
  setPlanificacion: React.Dispatch<React.SetStateAction<any>>;
  t: any; // Función de traducción
  data: any; // Datos adicionales (etapas, proyectos, etc.)
  formik?: FormikProps<PlanificacionProyectoDesarrollo>;
  etapasExistente?: [PlanificacionProyectoDesarrollo] | any;
}

const PlanificacionProyectoDesarrolloForm: React.FC<FormProps> = ({
  planificacionModel,
  setPlanificacion,
  t,
  data,
  formik,
  etapasExistente,
}) => {
  const etapasOrdenadas = [
    new EtapaPlanificacionProyectoDesarrollo(null).Constantes.Kick_Off,
    new EtapaPlanificacionProyectoDesarrollo(null).Constantes.Preparacion,
    new EtapaPlanificacionProyectoDesarrollo(null).Constantes.Levantamiento,
    new EtapaPlanificacionProyectoDesarrollo(null).Constantes.Desarrollo,
    new EtapaPlanificacionProyectoDesarrollo(null).Constantes.QA_Interno,
    new EtapaPlanificacionProyectoDesarrollo(null).Constantes.QA_Externo,
  ];
  return (
    <>
      <div className="mb-3 mt-3 row align-items-center">
        <label htmlFor="nombre" className="col-sm-1 col-form-label">
          {t.Common.name}
        </label>
        <div className="col-sm-2">
          <Form.Control
            type="text"
            id="nombre"
            name="nombre"
            className={`form-control ${
              formik?.errors.nombre && formik?.touched.nombre
                ? 'is-invalid'
                : ''
            }`}
            value={
              formik ? formik.values.nombre : planificacionModel.nombre || ''
            }
            onChange={formik?.handleChange}
          />
          {formik?.errors.nombre && formik.touched.nombre && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.nombre}
            </Form.Control.Feedback>
          )}
        </div>
        <SelectField
          label={t.project.stage}
          options={data.etapas}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, 'idEtapa', setPlanificacion)}
          selectedValue={planificacionModel.idEtapa}
        />
        {formik?.errors.idEtapa && formik.touched.idEtapa && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.idEtapa}
          </Form.Control.Feedback>
        )}

        <label className="col-sm-1 col-form-label">{t.project.dateStart}</label>
        <div className="col-sm-2">
          <MyDatePicker
            selectedDate={planificacionModel.fechaInicio}
            onChange={(date) =>
              setPlanificacion({ ...planificacionModel, fechaInicio: date })
            }
            title={t.Common.date}
            isRead={planificacionModel.id ? true : false}
          />
        </div>
        <label className="col-sm-1 col-form-label">{t.project.dateEnd}</label>

        <div className="col-sm-2">
          <MyDatePicker
            selectedDate={planificacionModel.fechaTermino}
            onChange={(date) =>
              setPlanificacion({
                ...planificacionModel,
                fechaTermino: date,
              })
            }
            title={t.Common.date}
            isRead={planificacionModel.id ? true : false}
          />
        </div>
      </div>
      <div className="mb-3 row align-items-center">
        <label
          htmlFor="porcentajeCargaTrabajo"
          className="col-sm-1 col-form-label"
        >
          {t.project.percentageWork}
        </label>
        <div className="col-sm-2">
          <Form.Control
            type="number"
            id="porcentajeCargaTrabajo"
            name="porcentajeCargaTrabajo"
            max={100}
            min={0}
            className={`form-control ${
              formik?.errors.porcentajeCargaTrabajo &&
              formik?.touched.porcentajeCargaTrabajo
                ? 'is-invalid'
                : ''
            }`}
            value={
              formik
                ? formik.values.porcentajeCargaTrabajo
                : planificacionModel.porcentajeCargaTrabajo || ''
            }
            onChange={formik?.handleChange}
          />
          {formik?.errors.porcentajeCargaTrabajo &&
            formik.touched.porcentajeCargaTrabajo && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.porcentajeCargaTrabajo}
              </Form.Control.Feedback>
            )}
        </div>
        {planificacionModel.id ? (
          <>
            <label className="col-sm-1 col-form-label">
              {t.project.dateStart} Real
            </label>
            <div className="col-sm-2">
              <MyDatePicker
                selectedDate={planificacionModel.fechaActividad}
                onChange={(date) =>
                  setPlanificacion({
                    ...planificacionModel,
                    fechaActividad: date,
                  })
                }
                title={t.Common.date}
              />
            </div>

            <label className="col-sm-1 col-form-label">
              {t.project.dateEnd} Real
            </label>
            <div className="col-sm-2">
              <MyDatePicker
                selectedDate={planificacionModel.fechaTerminoReal}
                onChange={(date) =>
                  setPlanificacion({
                    ...planificacionModel,
                    fechaTerminoReal: date,
                  })
                }
                title={t.Common.date}
              />
            </div>
            <label htmlFor="terminado" className="col-sm-1 col-form-label">
              {t.project.finishedStage}?
            </label>
            <div className="col-sm-1">
              <Form.Check
                type="checkbox"
                id="terminado"
                name="terminado"
                checked={formik?.values.terminado || false}
                onChange={(e) => {
                  formik?.setFieldValue('terminado', e.target.checked);
                }}
                label={t.Common.yes}
              />
            </div>
          </>
        ) : null}
      </div>
      <div className="mb-3 row align-items-center">
        <label htmlFor="avanceEsperado" className="col-sm-1 col-form-label">
          {t.project.expectedProgress}
        </label>
        <div className="col-sm-2">
          <input
            type="number"
            className="form-control"
            id="avanceEsperado"
            name="avanceEsperado"
            min={0}
            max={100}
            value={
              formik
                ? formik.values.avanceEsperado
                : planificacionModel.avanceEsperado || ''
            }
            onChange={formik?.handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default PlanificacionProyectoDesarrolloForm;
