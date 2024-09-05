import ContactosProspecto from '@/app/api/models/prospecto/ContactoProspecto';
import { FormikProps } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';
import {
  handleSelectChange,
  handleInputChange,
} from '@/app/[locale]/utils/Form/UtilsForm';
import SelectField from '@/app/[locale]/components/common/SelectField';
interface FormProps {
  contactoProspectoModel: ContactosProspecto;
  setContactoProspecto: React.Dispatch<React.SetStateAction<any>>;
  t: any; // Función de traducción
  data: any;
  formik: FormikProps<ContactosProspecto>;
}
const ContactoProspectoForm: React.FC<FormProps> = ({
  t,
  data,
  formik,
  contactoProspectoModel,
  setContactoProspecto,
}) => {
  return (
    <>
      <div className="mb-3 row align-items-center">
        <label htmlFor="nombreCompleto" className="col-sm-1 col-form-label">
          {t.Common.fullName}
        </label>
        <div className="col-sm-3">
          <Form.Control
            type="string"
            name="nombreCompleto"
            id="nombreCompleto"
            value={contactoProspectoModel.nombreCompleto || ''}
            onChange={handleInputChange(
              contactoProspectoModel,
              setContactoProspecto
            )}
            isInvalid={
              formik.touched.nombreCompleto && !!formik.errors.nombreCompleto
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.touched.nombreCompleto && formik.errors.nombreCompleto}
          </Form.Control.Feedback>
        </div>
        <label htmlFor="perfilLinkedin" className="col-sm-1 col-form-label">
          LinkedIn
        </label>
        <div className="col-sm-3">
          <Form.Control
            type="string"
            name="perfilLinkedin"
            id="perfilLinkedin"
            value={contactoProspectoModel.perfilLinkedin || ''}
            onChange={handleInputChange(
              contactoProspectoModel,
              setContactoProspecto
            )}
            isInvalid={
              formik.touched.perfilLinkedin && !!formik.errors.perfilLinkedin
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.touched.numero && formik.errors.numero}
          </Form.Control.Feedback>
        </div>
        <label htmlFor="numero" className="col-sm-1 col-form-label">
          {t.Common.number} {t.Common.phone}
        </label>
        <div className="col-sm-3">
          <Form.Control
            type="number"
            name="numero"
            id="numero"
            value={contactoProspectoModel.numero || ''}
            onChange={handleInputChange(
              contactoProspectoModel,
              setContactoProspecto
            )}
            isInvalid={formik.touched.numero && !!formik.errors.numero}
          />
          <Form.Control.Feedback type="invalid">
            {formik.touched.numero && formik.errors.numero}
          </Form.Control.Feedback>
        </div>
      </div>
      <div className="mb-3 row align-items-center">
        <label htmlFor="email" className="col-sm-1 col-form-label">
          Email
        </label>
        <div className="col-sm-3">
          <Form.Control
            type="email"
            name="email"
            id="email"
            value={contactoProspectoModel.email || ''}
            onChange={handleInputChange(
              contactoProspectoModel,
              setContactoProspecto
            )}
            isInvalid={formik.touched.email && !!formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.touched.email && formik.errors.email}
          </Form.Control.Feedback>
        </div>
        <SelectField
          label={`${t.Account.type}`}
          options={data.tipos}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) =>
            handleSelectChange(e, 'idTipo', setContactoProspecto)
          }
          selectedValue={contactoProspectoModel.idTipo}
        />
        <SelectField
          label={t.Account.country}
          options={data.paises}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) =>
            handleSelectChange(e, 'idPais', setContactoProspecto)
          }
          selectedValue={contactoProspectoModel.idPais}
        />
      </div>
      <div className="mb-3 row align-items-center">
        <SelectField
          label={`${t.Ficha.position}`}
          options={data.perfiles}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) =>
            handleSelectChange(e, 'idPerfil', setContactoProspecto)
          }
          selectedValue={contactoProspectoModel.idPerfil}
        />
      </div>
    </>
  );
};

export default ContactoProspectoForm;
