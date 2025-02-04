import React from 'react';
import RegistroHorasProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/RegistroHorasProyectoDesarrollo';
import SelectField from '@/app/[locale]/components/common/SelectField';
import { handleSelectChange } from '@/app/[locale]/utils/Form/UtilsForm';
import MyDatePicker from '@/app/[locale]/components/common/MyDatePicker';
import { FormikProps } from 'formik';
import { Form } from 'react-bootstrap';

interface FormProps {
  registroModel: RegistroHorasProyectoDesarrollo;
  setRegistro: React.Dispatch<React.SetStateAction<any>>;
  t: any;
  formik?: FormikProps<RegistroHorasProyectoDesarrollo>;
}

const RegistroHorasProyectoDesarrolloForm: React.FC<FormProps> = ({
  registroModel,
  setRegistro,
  t,
  formik,
}) => {
  return (
    <>
      <div className="mb-3 row align-items-center">
        <label className="col-sm-1 col-form-label">{t.time.week}</label>
        <div className="col-sm-2">
          <MyDatePicker
            selectedDate={registroModel.semana}
            onChange={(date) => setRegistro({ ...registroModel, semana: date })}
            title={t.Common.date}
            // isRead={registroModel.id ? true : false}
          />
        </div>
        <label htmlFor="horasTrabajadas" className="col-sm-1 col-form-label">
          {t.Common.hour}
        </label>
        <div className="col-sm-4">
          <Form.Control
            type="number"
            id="horasTrabajadas"
            name="horasTrabajadas"
            step="0.5"
            min="0"
            max="168"
            className={`form-control ${
              formik?.errors.horasTrabajadas && formik?.touched.horasTrabajadas
                ? 'is-invalid'
                : ''
            }`}
            value={
              formik
                ? formik.values.horasTrabajadas
                : registroModel.horasTrabajadas || ''
            }
            onChange={formik?.handleChange}
          />
          {formik?.errors.horasTrabajadas && formik.touched.horasTrabajadas && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.horasTrabajadas}
            </Form.Control.Feedback>
          )}
        </div>
      </div>
    </>
  );
};

export default RegistroHorasProyectoDesarrolloForm;
