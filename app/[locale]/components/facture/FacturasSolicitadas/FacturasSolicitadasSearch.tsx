import React, { useMemo } from 'react'
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import FacturaPeriodo from '@/app/api/models/factura/FacturaPeriodo';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import ButtonsFacture from '../ButtonsFacture';
import PeriodosProyecto from '@/app/api/models/proyecto/PeriodosProyecto';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function FacturasSolicitadasSearch({ t, facturas }) {
  const columns = useMemo(() => FacturaPeriodo.createColumnsFacturas(t), [t]);
  const memoizedFacturaActions = useMemo(() => {
    return facturas.map((factura) => ({
      ...FacturaPeriodo.transformFacturaPeriodoData(factura),
      documento:"",
      _hito: new PeriodosProyecto(factura.periodo).getPeriodoCompleto(),
      actions: (
        <ButtonsFacture t={t} idFactura={factura.id} idPeriodo={factura.idPeriodo} periodoFactura={factura}/>
      )
    }));
  }, [facturas, t]);
  return (
    <>
      {/* <h4>{t.Nav.facture.billing}</h4> */}
      <MemoizedTableMaterialUI columns={FacturaPeriodo.createColumnsFacturas(t)} data={memoizedFacturaActions} />
    </>
  )
}

export default FacturasSolicitadasSearch