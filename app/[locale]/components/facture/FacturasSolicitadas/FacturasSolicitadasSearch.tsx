"use client";
import React, { useMemo } from 'react'
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import FacturaPeriodo from '@/app/api/models/factura/FacturaPeriodo';
import { Button } from 'react-bootstrap';
import ButtonsFacture from '../ButtonsFacture';
import PeriodosProyecto from '@/app/api/models/proyecto/PeriodosProyecto';
import { Tooltip } from 'react-tooltip';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function FacturasSolicitadasSearch({ t, facturas }) {
  const columns = useMemo(() => FacturaPeriodo.createColumnsFacturas(t), [t]);
  const downloadDocumento = (documento) => {
    const uint8Array = new Uint8Array(atob(documento.contenidoDocumento).split('').map((char) => char.charCodeAt(0)));

    const blob = new Blob([uint8Array], { type: 'application/pdf' });

    // Crea una URL de objeto para el Blob
    const blobUrl = URL.createObjectURL(blob);

    // Crea un enlace (a) para descargar el Blob
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = documento.nombreDocumento; // Ajusta el nombre del archivo según tus necesidades

    // Agrega el enlace al documento y simula un clic para iniciar la descarga
    document.body.appendChild(link);
    link.click();

    // Elimina el enlace después de la descarga
    document.body.removeChild(link);

    // Liberar recursos
    URL.revokeObjectURL(blobUrl);
  };
  const memoizedFacturaActions = useMemo(() => {
    return facturas.map((factura) => ({
      ...FacturaPeriodo.transformFacturaPeriodoData(factura),
      _documento: (
        <Button
          variant="link"
          onClick={() => downloadDocumento(factura.documentosFactura[0])}
          disabled={!factura.documentosFactura[0] || !factura.documentosFactura[0].contenidoDocumento}
          style={{ fontSize: factura.documentosFactura[0] ? '14px' : '14px' }}
          className='descargar'
        >
          {factura.documentosFactura[0] ? factura.documentosFactura[0].nombreDocumento : t.Common.noDocument}
          <Tooltip anchorSelect='.descargar' >
            {t.Common.downloadFile}
          </Tooltip>
        </Button>
      ),
      _hito: new PeriodosProyecto(factura.periodo).getPeriodoCompleto(),
      actions: (
        <ButtonsFacture t={t} idFactura={factura.id} idPeriodo={factura.idPeriodo} periodoFactura={factura} />
      )
    }));
  }, [facturas, t]);
  return (
    <>
      <h4 className='mb-3'>{t.Nav.facture.billing}</h4> 
      <MemoizedTableMaterialUI columns={FacturaPeriodo.createColumnsFacturas(t)} data={memoizedFacturaActions} />
    </>
  )
}

export default FacturasSolicitadasSearch