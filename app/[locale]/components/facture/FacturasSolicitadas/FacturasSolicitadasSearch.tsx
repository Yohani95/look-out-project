"use client";
import React, { useMemo,useState } from 'react'
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import FacturaPeriodo from '@/app/api/models/factura/FacturaPeriodo';
import { Button, Modal } from 'react-bootstrap';
import ButtonsFacture from '../ButtonsFacture';
import PeriodosProyecto from '@/app/api/models/proyecto/PeriodosProyecto';
import { Tooltip } from 'react-tooltip';
import HorasUtilizadas from '@/app/api/models/support/HorasUtilizadas';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function FacturasSolicitadasSearch({ t, facturas,monedas }) {
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
      _hito: factura?.periodo ? new PeriodosProyecto(factura.periodo).getPeriodoCompleto() : (factura.horasUtilizadas ? new HorasUtilizadas(factura.horasUtilizadas).getPeriodoCompleto() : 'N/A'),
      actions: (
        <ButtonsFacture t={t} idFactura={factura.id} idPeriodo={factura.idPeriodo} idHoraUtilizada={factura.idHorasUtilizadas} periodoFactura={factura} monedas={monedas} />
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