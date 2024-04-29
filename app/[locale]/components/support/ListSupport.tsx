"use client"
import React, { useMemo } from 'react'
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import SupportButtons from '@/app/[locale]/components/support/SupportButtons';
import Soporte from '@/app/api/models/support/Soporte';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function ListSupport({ t, data }) {
  const columns = useMemo(() => Soporte.createColumns(t), [t]);
  const memoizedSoporteActions = useMemo(() => {
    return data.map((soporte) => ({
      ...Soporte.transformFacturaPeriodoData(soporte),
      actions: (
        <SupportButtons t={t} proyecto={soporte}/>
      )
    }));
  }, [data, t]);
  return (
    <>
      <h4 className='mb-3'>{t.support.bagholder}</h4>
      <div className="d-flex justify-content-end container mb-3">
        <Link href={"/business/Support/bag/create"}>
          <button type="button" className=" btn btn-primary ">
            + {t.Account.add} {t.support.bagholder}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI columns={columns} data={memoizedSoporteActions} />
    </>
  )
}

export default ListSupport