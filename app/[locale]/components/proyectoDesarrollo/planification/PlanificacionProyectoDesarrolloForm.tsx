import React from 'react';
import SelectField from '@/app/[locale]/components/common/SelectField';
import { handleSelectChange } from '@/app/[locale]/utils/Form/UtilsForm';
import MyDatePicker from '@/app/[locale]/components/common/MyDatePicker';
import { FormikProps } from 'formik';
import { Form } from 'react-bootstrap';
import PlanificacionProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/PlanificacionProyectoDesarrollo';

interface FormProps {
  planificacionModel: PlanificacionProyectoDesarrollo;
  setPlanificacion: React.Dispatch<React.SetStateAction<any>>;
  t: any; // Función de traducción
  data: any; // Datos adicionales (etapas, proyectos, etc.)
  formik?: FormikProps<PlanificacionProyectoDesarrollo>;
}

const PlanificacionProyectoDesarrolloForm: React.FC<FormProps> = ({
  planificacionModel,
  setPlanificacion,
  t,
  data,
  formik,
}) => {
  return (
    <>
      <div className="mb-3 mt-3 row align-items-center">
        <label htmlFor="nombre" className="col-sm-1 col-form-label">
          {t.Common.name}
        </label>
        <div className="col-sm-3">
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
          label={'Etapa'}
          options={data.etapas}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, 'idEtapa', setPlanificacion)}
          selectedValue={planificacionModel.idEtapa}
          isInvalid={!!formik?.errors.idEtapa && formik?.touched.idEtapa}
        />
        {formik?.errors.idEtapa && formik.touched.idEtapa && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.idEtapa}
          </Form.Control.Feedback>
        )}
      </div>
      <div className="mb-3 row align-items-center">
        <label
          htmlFor="porcentajeCargaTrabajo"
          className="col-sm-1 col-form-label"
        >
          {'Carga Trabajo %'}
        </label>
        <div className="col-sm-3">
          <Form.Control
            type="number"
            id="porcentajeCargaTrabajo"
            name="porcentajeCargaTrabajo"
            max={100}
            min={1}
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
        <label htmlFor="lineaBase" className="col-sm-1 col-form-label">
          {'Linea Base?'}
        </label>
        <div className="col-sm-3">
          <Form.Check
            type="checkbox"
            id="lineaBase"
            name="lineaBase"
            checked={formik?.values.lineaBase || false}
            onChange={(e) => {
              formik?.setFieldValue('lineaBase', e.target.checked);
            }}
            label={t.Common.yes}
          />
        </div>
      </div>
    </>
  );
};

export default PlanificacionProyectoDesarrolloForm;
