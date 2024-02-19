"use client"
import React, { useMemo } from 'react'
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import { Tooltip } from 'react-tooltip';
import Proyecto from '@/app/api/models/proyecto/Proyecto';
import Link from 'next/link';
import SupportButtons from '@/app/[locale]/components/support/SupportButtons';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function ListSupport({ t, data }) {
  const columns = useMemo(() => Proyecto.createColumns(t), [t]);
  const memoizedProyectoActions = useMemo(() => {
    return data.map((proyecto) => ({
      ...Proyecto.transformFacturaPeriodoData(proyecto),
      actions: (
        <SupportButtons t={t} proyecto={proyecto}/>
      )
    }));
  }, [data, t]);
  return (
    <>
      <h4 className='mb-3'>{t.Common.supports}</h4>
      <div className="d-flex justify-content-end container mb-3">
        <Link href={"/business/closeServices/create"}>
          <button type="button" className=" btn btn-primary ">
            + {t.Account.add} {t.Common.supports}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI columns={columns} data={memoizedProyectoActions} />
    </>
  )
}

export default ListSupport