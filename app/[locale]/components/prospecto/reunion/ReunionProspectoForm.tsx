import React from 'react';
import { FormikProps } from 'formik';
import ReunionProspecto from '@/app/api/models/prospecto/ReunionProspecto';
import { Form } from 'react-bootstrap';
import { handleInputChange } from '@/app/[locale]/utils/Form/UtilsForm';
import MyDatePicker from '../../common/MyDatePicker';

interface ReunionProspectoFormProps {
  t: any;
  reunionProspectoModel: ReunionProspecto;
  setReunionProspecto: React.Dispatch<React.SetStateAction<any>>;
  formik: FormikProps<ReunionProspecto>;
}

const ReunionProspectoForm: React.FC<ReunionProspectoFormProps> = ({
  t,
  reunionProspectoModel,
  setReunionProspecto,
  formik,
}) => {
  return (
    <div className="mb-3 row align-items-center">
      <label htmlFor="solicitaPropuesta" className="col-sm-1 col-form-label">
        {t.Common.submit} {t.Common.proposal}?
      </label>
      <div className="col-sm-1">
        <Form.Check
          type="checkbox"
          name="solicitaPropuesta"
          id="solicitaPropuesta"
          checked={reunionProspectoModel.solicitaPropuesta || false}
          onChange={(e) =>
            setReunionProspecto({
              ...reunionProspectoModel,
              solicitaPropuesta: e.target.checked,
            })
          }
          isInvalid={
            formik.touched.solicitaPropuesta &&
            !!formik.errors.solicitaPropuesta
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.touched.solicitaPropuesta && formik.errors.solicitaPropuesta}
        </Form.Control.Feedback>
      </div>
      <label className="col-sm-1 col-form-label">
        {t.Common.date} {t.Common.meeting}
      </label>
      <div className="col-sm-3">
        <MyDatePicker
          selectedDate={reunionProspectoModel.fechaReunion}
          onChange={(date) =>
            setReunionProspecto({
              ...reunionProspectoModel,
              fechaReunion: date,
            })
          }
          title={t.Common.date}
          withTime={true}
        />
      </div>
      <label htmlFor="detalle" className="col-sm-2 col-form-label">
        {t.Common.description}
      </label>
      <div className="col-sm-3">
        <Form.Control
          as="textarea"
          rows={2}
          name="detalle"
          id="detalle"
          value={reunionProspectoModel.detalle || ''}
          onChange={handleInputChange(
            reunionProspectoModel,
            setReunionProspecto
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

export default ReunionProspectoForm;
