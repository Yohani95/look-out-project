import FacturaAdaptacion from '@/app/api/models/factura/FacturaAdaptacion';
import { ErrorMessage, Field, FormikProps } from 'formik';
import React from 'react';

interface FacturaAdaptacionProps {
  t: any;
}

const AdaptationFactureForm: React.FC<FacturaAdaptacionProps> = ({ t }) => {
  return (
    <>
      <div className="">
        <div className="form-group">
          <label htmlFor="monto">{t.Common.newTotalAmount}</label>
          <Field type="number" name="monto" className="form-control" />
          <ErrorMessage name="monto" component="div" className="text-danger" />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="descripcion">{t.Common.description}</label>
          <Field type="text" name="descripcion" className="form-control" />
          <ErrorMessage
            name="descripcion"
            component="div"
            className="text-danger"
          />
        </div>
      </div>
    </>
  );
};

export default AdaptationFactureForm;
