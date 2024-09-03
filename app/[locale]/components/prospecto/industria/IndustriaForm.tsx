import Industria from '@/app/api/models/prospecto/Industria';
import { FormikProps } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';
import { handleInputChange } from '@/app/[locale]/utils/Form/UtilsForm';

interface FormProps {
  industriaModel: Industria;
  setIndustria: React.Dispatch<React.SetStateAction<any>>;
  t: any; // Función de traducción
  formik: FormikProps<Industria>;
}

const IndustriaForm: React.FC<FormProps> = ({
  t,
  formik,
  industriaModel,
  setIndustria,
}) => {
  return (
    <>
      <div className="mb-3 row align-items-center">
        <label htmlFor="nombre" className="col-sm-1 col-form-label">
          {t.Common.name}
        </label>
        <div className="col-sm-3">
          <Form.Control
            type="string"
            name="nombre"
            id="nombre"
            value={industriaModel.nombre || ''}
            onChange={handleInputChange(industriaModel, setIndustria)}
            isInvalid={formik.touched.nombre && !!formik.errors.nombre}
          />
          <Form.Control.Feedback type="invalid">
            {formik.touched.nombre && formik.errors.nombre}
          </Form.Control.Feedback>
        </div>
        <label htmlFor="detalle" className="col-sm-1 col-form-label">
          {t.Common.description}
        </label>
        <div className="col-sm-3">
          <Form.Control
            type="string"
            name="detalle"
            id="detalle"
            value={industriaModel.detalle || ''}
            onChange={handleInputChange(industriaModel, setIndustria)}
            isInvalid={formik.touched.detalle && !!formik.errors.detalle}
          />
          <Form.Control.Feedback type="invalid">
            {formik.touched.detalle && formik.errors.detalle}
          </Form.Control.Feedback>
        </div>
      </div>
    </>
  );
};

export default IndustriaForm;
