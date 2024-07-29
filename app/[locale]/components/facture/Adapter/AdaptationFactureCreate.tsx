import { Formik, Form, useFormik } from 'formik';
import React from 'react';
import AdaptationFactureForm from './AdaptationFactureForm';
import FacturaAdaptacion from '@/app/api/models/factura/FacturaAdaptacion';
import { Button } from 'react-bootstrap';

interface createProps {
  // Add initial values for your form here
  facturaAdaptacion: FacturaAdaptacion | null;
  t: any;
}
const AdaptationFactureCreate: React.FC<createProps> = ({
  t,
  facturaAdaptacion,
}) => {
  const initialValues = new FacturaAdaptacion(facturaAdaptacion);
  const validationSchema = FacturaAdaptacion.getValidationSchema(t);
  const handleSubmit = (values: FacturaAdaptacion) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <AdaptationFactureForm t={t} />
        </Form>
      )}
    </Formik>
  );
};

export default AdaptationFactureCreate;
