"use client";
import React, { useMemo,useState } from 'react'
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import FacturaPeriodo from '@/app/api/models/factura/FacturaPeriodo';
import { Button, Modal } from 'react-bootstrap';
import ButtonsFacture from '../ButtonsFacture';
import PeriodosProyecto from '@/app/api/models/proyecto/PeriodosProyecto';
import { Tooltip } from 'react-tooltip';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function FacturasSolicitadasSearch({ t, facturas }) {
  const columns = useMemo(() => FacturaPeriodo.createColumnsFacturas(t), [t]);
  const toggleObservaciones = (observaciones) => {
    setObservacionesModal(observaciones);
    setShowModal(!showModal);
  };
  
  
  const [showModal, setShowModal] = useState(false);
const [observacionesModal, setObservacionesModal] = useState('');

  

  const memoizedFacturaActions = useMemo(() => {
    return facturas.map((factura, index) => ({
      ...FacturaPeriodo.transformFacturaPeriodoData(factura),
      _hito: new PeriodosProyecto(factura.periodo).getPeriodoCompleto(),
      actions: (
        <ButtonsFacture t={t} idFactura={factura.id} idPeriodo={factura.idPeriodo} periodoFactura={factura} />
      ),
      observaciones: (
        <div>
        {factura.observaciones.slice(0, 25)} {/* Mostrar solo los primeros 50 caracteres */}
        {factura.observaciones.length > 25 && (
          <Button variant="link" onClick={() => toggleObservaciones(factura.observaciones)}>Ver más</Button>
        )}
      </div>
      )
    }));
  }, [facturas, t]);
  return (
    <>
      <h4 className='mb-3'>{t.Nav.facture.billing}</h4> 
      <MemoizedTableMaterialUI columns={FacturaPeriodo.createColumnsFacturas(t)} data={memoizedFacturaActions} />
      {showModal && (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Observaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {observacionesModal}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    )}
    </>
  )
}

export default FacturasSolicitadasSearch