import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FacturaAdaptacion from '@/app/api/models/factura/FacturaAdaptacion';
import { Form, Formik } from 'formik';
import AdaptationFactureForm from './AdaptationFactureForm';
import {
  createFacturaAdaptacion,
  updateFacturaAdaptacion,
} from '@/app/api/actions/factura/FacturaAdaptacionActions';
import Utils from '@/app/api/models/common/Utils';
import { usePathname } from 'next/navigation';

interface ModalProps {
  t: any;
  facturaAdaptacion: FacturaAdaptacion | null; // Optional for editing existing facture adaptation. Null for adding new.
  idCliente: number; // Optional for editing existing facture adaptation. Null for adding new.
  monto: number; // Optional for editing existing facture adaptation. Null for adding new.
  onFacturaAdaptacionChange: (newFacturaAdaptacion: FacturaAdaptacion) => void;
  id: number; // Optional for editing existing facture adaptation. Null for adding new.
}

const AdaptationFactureModal: React.FC<ModalProps> = ({
  t,
  facturaAdaptacion,
  idCliente,
  monto,
  onFacturaAdaptacionChange,
  id, // Optional for editing existing facture adaptation. Null for adding new.
}) => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const initialValues = new FacturaAdaptacion(facturaAdaptacion);
  const validationSchema = FacturaAdaptacion.getValidationSchema(t);
  const handleSubmit = async (values: FacturaAdaptacion) => {
    try {
      await Utils.showLoadingNotification(t);
      // Asignar valores adicionales
      values.idCliente = idCliente;
      values.montoDiferencia = values.monto - monto;
      // Determinar cómo actualizar la factura en función del pathname
      switch (true) {
        case pathname.includes('createLicense'):
          values.idLicencia = id;
          break;
        case pathname.includes('createSupport'): // Corregido 'Suppot' a 'Support'
          console.log('Handling "createSupport" route');
          values.idSoporte = id;
          break;
        case pathname.includes('createBagSupport'):
          console.log('Handling "createBagSupport" route');
          values.idHorasUtilizadas = id;
          break;
        default:
          values.idPeriodoProyecto = id;
          break;
      }

      if (!facturaAdaptacion) {
        console.log('Creating new factura');
        await Utils.handleOnSubmit(t, createFacturaAdaptacion, values);
      } else {
        console.log('Editing existing factura');
        const updatedFactura = new FacturaAdaptacion(values);
        await Utils.handleOnSubmit(
          t,
          updateFacturaAdaptacion,
          updatedFactura,
          updatedFactura.id
        );
      }

      // Notificar al componente padre sobre el cambio
      onFacturaAdaptacionChange(values);
    } catch (error) {
      console.error('Error handling submit:', error);
      // Manejo de errores si es necesario
    } finally {
      handleClose(); // Asegúrate de cerrar el modal al finalizar
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        {t.Account.button.Modify} {t.Nav.facture.billing}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {t.Account.button.Modify} {t.Nav.facture.billing}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <AdaptationFactureForm t={t} />
                <hr />
                <div className="d-flex justify-content-end mt-1">
                  <Button
                    variant="secondary"
                    className="m-2"
                    onClick={handleClose}
                  >
                    {t.Common.cancel}
                  </Button>
                  <Button variant="primary" type="submit" className="m-2">
                    {t.Common.saveButton}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdaptationFactureModal;
