import React from 'react';
import { FormikProps } from 'formik';
import LlamadaProspecto from '@/app/api/models/prospecto/LlamadaProspecto';
import { Form } from 'react-bootstrap';
import SelectField from '@/app/[locale]/components/common/SelectField';
import {
  handleSelectChange,
  handleInputChange,
} from '@/app/[locale]/utils/Form/UtilsForm';
interface LlamadaProspectoFormProps {
  t: any;
  llamadaProspectoModel: LlamadaProspecto;
  setLlamadaProspecto: React.Dispatch<React.SetStateAction<any>>;
  data: any;
  formik: FormikProps<LlamadaProspecto>;
}

const LlamadaProspectoForm: React.FC<LlamadaProspectoFormProps> = ({
  t,
  llamadaProspectoModel,
  setLlamadaProspecto,
  data,
  formik,
}) => {
  return (
    <div className="mb-3 row align-items-center">
      <label htmlFor="respondeLlamada" className="col-sm-1 col-form-label">
        {t.Common.respondsCall} ?
      </label>
      <div className="col-sm-1">
        <Form.Check
          type="checkbox"
          name="respondeLlamada"
          id="respondeLlamada"
          checked={llamadaProspectoModel.respondeLlamada || false}
          onChange={(e) =>
            setLlamadaProspecto({
              ...llamadaProspectoModel,
              respondeLlamada: e.target.checked,
            })
          }
          isInvalid={
            formik.touched.respondeLlamada && !!formik.errors.respondeLlamada
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.touched.respondeLlamada && formik.errors.respondeLlamada}
        </Form.Control.Feedback>
      </div>
      <SelectField
        label={`${t.Account.type} ${t.Common.activity}`}
        options={data.medioLlamada}
        preOption={t.Account.select}
        labelClassName="col-sm-1 col-form-label"
        divClassName="col-sm-3"
        onChange={(e) =>
          handleSelectChange(e, 'idMedioLlamadaProspecto', setLlamadaProspecto)
        }
        selectedValue={llamadaProspectoModel.idMedioLlamadaProspecto}
      />
      <label htmlFor="detalle" className="col-sm-1 col-form-label">
        {t.Common.description}
      </label>
      <div className="col-sm-3">
        <Form.Control
          as="textarea"
          rows={2}
          name="detalle"
          id="detalle"
          value={llamadaProspectoModel.detalle || ''}
          onChange={handleInputChange(
            llamadaProspectoModel,
            setLlamadaProspecto
          )}
          isInvalid={formik.touched.detalle && !!formik.errors.detalle}
        />
        <Form.Control.Feedback type="invalid">
          {formik.touched.detalle && formik.errors.detalle}
        </Form.Control.Feedback>
      </div>
    </div>
  );
};

export default LlamadaProspectoForm;
