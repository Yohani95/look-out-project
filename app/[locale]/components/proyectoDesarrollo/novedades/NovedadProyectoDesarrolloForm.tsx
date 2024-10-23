import NovedadProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/NovedadProyectoDesarrollo';
import React from 'react';
import SelectField from '@/app/[locale]/components/common/SelectField';
import { handleSelectChange } from '@/app/[locale]/utils/Form/UtilsForm';
import MyDatePicker from '@/app/[locale]/components/common/MyDatePicker';
import { FormikProps } from 'formik';
import { Form } from 'react-bootstrap';

interface FormProps {
  novedadModel: NovedadProyectoDesarrollo;
  setNovedad: React.Dispatch<React.SetStateAction<any>>;
  t: any; // Función de traducción
  data: any; // Datos adicionales (tipos de novedad, proyectos, etc.)
  formik?: FormikProps<NovedadProyectoDesarrollo>;
}

const NovedadProyectoDesarrolloForm: React.FC<FormProps> = ({
  novedadModel,
  setNovedad,
  t,
  data,
  formik,
}) => {
  return (
    <>
      <div className="mb-3  mt-3 row align-items-center">
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
            value={formik ? formik.values.nombre : novedadModel.nombre || ''}
            onChange={formik?.handleChange}
          />
          {formik?.errors.nombre && formik.touched.nombre && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.nombre}
            </Form.Control.Feedback>
          )}
        </div>
        <SelectField
          label={t.Ficha.type}
          options={data.tiposNovedad}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) =>
            handleSelectChange(e, 'idTipoNovedadProyectoDesarrollo', setNovedad)
          }
          selectedValue={novedadModel.idTipoNovedadProyectoDesarrollo}
          isInvalid={
            !!formik?.errors.idTipoNovedadProyectoDesarrollo &&
            formik?.touched.idTipoNovedadProyectoDesarrollo
          }
        />
        {formik?.errors.idTipoNovedadProyectoDesarrollo &&
          formik.touched.idTipoNovedadProyectoDesarrollo && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.idTipoNovedadProyectoDesarrollo}
            </Form.Control.Feedback>
          )}
      </div>
      <hr />
      <div className="mb-3 row align-items-center">
        <label htmlFor="descripcion" className="col-sm-1 col-form-label">
          {t.Common.description}
        </label>
        <div className="col-sm-6">
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
              formik
                ? formik.values.descripcion
                : novedadModel.descripcion || ''
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

export default NovedadProyectoDesarrolloForm;
