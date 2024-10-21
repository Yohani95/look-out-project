import HitoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/HitoProyectoDesarrollo';
import React, { useEffect } from 'react';
import SelectField from '@/app/[locale]/components/common/SelectField';
import { handleSelectChange } from '@/app/[locale]/utils/Form/UtilsForm';
import MyDatePicker from '@/app/[locale]/components/common/MyDatePicker';
import { FormikProps } from 'formik';
import { Form } from 'react-bootstrap';

interface FormProps {
  hitoModel: HitoProyectoDesarrollo;
  setHito: React.Dispatch<React.SetStateAction<any>>;
  t: any; // Función de traducción
  data: any; // Datos adicionales (tipos de hito, proyectos, etc.)
  formik?: FormikProps<HitoProyectoDesarrollo>;
}

const HitoProyectoDesarrolloForm: React.FC<FormProps> = ({
  hitoModel,
  setHito,
  t,
  data,
  formik,
}) => {
  // useEffect para calcular el porcentaje pagado cuando cambia el monto
  useEffect(() => {
    if (formik.values.monto && data.montoProyecto > 0) {
      const porcentaje = (formik.values.monto / data.montoProyecto) * 100;
      formik.setFieldValue('porcentajePagado', porcentaje.toFixed(2)); // Actualiza el campo porcentajePagado
    } else {
      formik.setFieldValue('porcentajePagado', 0);
    }
  }, [formik.values.monto, data.montoProyecto]); // Ejecutar cuando cambie el monto o el montoProyecto

  return (
    <>
      <div className="mb-3 row align-items-center">
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
            value={formik ? formik.values.nombre : hitoModel.nombre || ''}
            onChange={formik?.handleChange}
          />
          {formik?.errors.nombre && formik.touched.nombre && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.nombre}
            </Form.Control.Feedback>
          )}
        </div>

        <label className="col-sm-1 col-form-label">{t.Common.date}</label>
        <div className="col-sm-3">
          <MyDatePicker
            selectedDate={hitoModel.fechaCreacion}
            onChange={(date) => setHito({ ...hitoModel, fechaCreacion: date })}
            title={t.Common.date}
          />
        </div>
        <SelectField
          label={t.Ficha.type}
          options={data.tiposHito}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, 'idTipoPagoHito', setHito)}
          selectedValue={hitoModel.idTipoPagoHito}
          isInvalid={
            !!formik?.errors.idTipoPagoHito && formik?.touched.idTipoPagoHito
          }
        />
        {formik?.errors.idTipoPagoHito && formik.touched.idTipoPagoHito && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.idTipoPagoHito}
          </Form.Control.Feedback>
        )}
      </div>

      <div className="mb-3 row align-items-center">
        <label htmlFor="monto" className="col-sm-1 col-form-label">
          {t.Common.amount}
        </label>
        <div className="col-sm-3">
          <Form.Control
            type="number"
            id="monto"
            name="monto"
            className={`form-control ${
              formik?.errors.monto && formik?.touched.monto ? 'is-invalid' : ''
            }`}
            value={formik ? formik.values.monto : hitoModel.monto || ''}
            onChange={formik?.handleChange}
          />
          {formik?.errors.monto && formik.touched.monto && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.monto}
            </Form.Control.Feedback>
          )}
        </div>
        {/* Campo porcentajePagado, deshabilitado y calculado */}
        <label htmlFor="porcentajePagado" className="col-sm-1 col-form-label">
          {t.Common.pay} %
        </label>
        <div className="col-sm-3">
          <Form.Control
            type="number"
            id="porcentajePagado"
            name="porcentajePagado"
            className={`form-control ${
              formik?.errors.porcentajePagado &&
              formik?.touched.porcentajePagado
                ? 'is-invalid'
                : ''
            }`}
            value={
              formik
                ? formik.values.porcentajePagado
                : hitoModel.porcentajePagado || ''
            }
            readOnly // Deshabilitar el campo para que no sea editable
          />
          {/* {formik?.errors.porcentajePagado &&
            formik.touched.porcentajePagado && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.porcentajePagado}
              </Form.Control.Feedback>
            )} */}
        </div>
      </div>
      <hr />
      <div className="mb-3 row align-items-center">
        <label htmlFor="descripcion" className="col-sm-1 col-form-label">
          {t.Common.description}
        </label>
        <div className="col-sm-8">
          <Form.Control
            as="textarea"
            rows={6}
            id="descripcion"
            name="descripcion"
            className={`form-control ${
              formik?.errors.descripcion && formik?.touched.descripcion
                ? 'is-invalid'
                : ''
            }`}
            value={
              formik ? formik.values.descripcion : hitoModel.descripcion || ''
            }
            onChange={formik?.handleChange}
          />
          {formik?.errors.descripcion && formik.touched.descripcion && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.descripcion}
            </Form.Control.Feedback>
          )}
        </div>
      </div>
    </>
  );
};

export default HitoProyectoDesarrolloForm;
