import React, { useMemo } from 'react'
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import FacturaPeriodo from '@/app/api/models/factura/FacturaPeriodo';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function FacturasSolicitadasSearch({t}) {
  const columns = useMemo(() => FacturaPeriodo.createColumns(t), [t]);
  return (
    <>
    {/* <h4>{t.Nav.facture.billing}</h4> */}
    <MemoizedTableMaterialUI columns={FacturaPeriodo.createColumnsFacturas(t)} data={[]} />
    </>
  )
}

export default FacturasSolicitadasSearch