'use client';
import React, { useMemo } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import Link from 'next/link';
import SupportButtons from '@/app/[locale]/components/support/SupportButtons';
import Soporte from '@/app/api/models/support/Soporte';
import { Constantes } from '@/app/api/models/common/Constantes';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function ListSupport({ t, data, tipo = Constantes.TipoSorpote.CONTRATO }) {
  const columns = useMemo(() => Soporte.createColumns(t), [t]);
  const memoizedSoporteActions = useMemo(() => {
    return data.map((soporte) => ({
      ...Soporte.transformFacturaPeriodoData(soporte),
      actions: <SupportButtons t={t} proyecto={soporte} />,
    }));
  }, [data, t]);
  const tipoSoporte = () => {
    var nombreSoporte;
    switch (tipo) {
      case Constantes.TipoSorpote.CONTRATO:
        nombreSoporte = t.support.contractSupport;
        break;
      case Constantes.TipoSorpote.BOLSA:
        nombreSoporte = t.support.bagholder;
        break;
      case Constantes.TipoSorpote.ONDEMAND:
        nombreSoporte = t.support.onDemandSupport;
        break;
      default:
        break;
    }
    return nombreSoporte;
  };
  const hrefSoporte = () => {
    var nombreSoporte;
    switch (tipo) {
      case Constantes.TipoSorpote.CONTRATO:
        nombreSoporte = '/business/Support/contract/create';
        break;
      case Constantes.TipoSorpote.BOLSA:
        nombreSoporte = '/business/Support/bag/create';
        break;
      case Constantes.TipoSorpote.ONDEMAND:
        nombreSoporte = '/business/Support/onDemand/create';
        break;
      default:
        break;
    }
    return nombreSoporte;
  };
  return (
    <>
      <div className="d-flex justify-content-end container mb-3">
        <Link href={hrefSoporte()}>
          <button type="button" className=" btn btn-primary ">
            {t.Account.add} {tipoSoporte()}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI
        columns={columns}
        data={memoizedSoporteActions}
      />
    </>
  );
}

export default ListSupport;
