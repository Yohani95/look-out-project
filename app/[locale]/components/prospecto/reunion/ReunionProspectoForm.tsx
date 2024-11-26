import React from 'react';
import { FormikProps } from 'formik';
import ReunionProspecto from '@/app/api/models/prospecto/ReunionProspecto';
import { Form } from 'react-bootstrap';
import {
  handleInputChange,
  handleSelectChange,
} from '@/app/[locale]/utils/Form/UtilsForm';
import MyDatePicker from '../../common/MyDatePicker';
import SelectField from '@/app/[locale]/components/common/SelectField';

interface ReunionProspectoFormProps {
  t: any;
  reunionProspectoModel: ReunionProspecto;
  setReunionProspecto: React.Dispatch<React.SetStateAction<any>>;
  formik: FormikProps<ReunionProspecto>;
  estados: any; // Array con estados de reuniones prospecto
}

const ReunionProspectoForm: React.FC<ReunionProspectoFormProps> = ({
  t,
  reunionProspectoModel,
  setReunionProspecto,
  formik,
  estados,
}) => {
  return (
    <>
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
            {formik.touched.solicitaPropuesta &&
              formik.errors.solicitaPropuesta}
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
        <SelectField
          label={t.Common.status}
          options={estados}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) =>
            handleSelectChange(
              e,
              'idEstadoReunionProspecto',
              setReunionProspecto
            )
          }
          selectedValue={reunionProspectoModel.idEstadoReunionProspecto}
        />
      </div>
      <div className="mb-3 row align-items-center">
        <label htmlFor="detalle" className="col-sm-2 col-form-label">
          {t.Common.description}
        </label>
        <div className="col-sm-4">
          <Form.Control
            as="textarea"
            rows={3}
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
    </>
  );
};

export default ReunionProspectoForm;
