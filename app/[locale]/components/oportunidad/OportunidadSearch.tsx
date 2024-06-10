"use client"
import Link from 'next/link'
import React, { useMemo } from 'react'
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import Oportunidad from '@/app/api/models/oportunidad/Oportunidad';
import OportunidadButtons from './OportunidadButtons';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function OportunidadSearch({ t, data}) {
  const columns= useMemo(() => Oportunidad.createColumns(t), [t]);
  const memoizedSoporteActions = useMemo(() => {
    return data.map((oportunidad : Oportunidad) => ({
      ...oportunidad,
      fechaCierre: new Oportunidad(oportunidad).getFechaString(),
      actions: (
       <>
       <OportunidadButtons oportunidad={oportunidad} t={t}/>
       </>
      )
    }));
  }, [data, t]);
  return (
    <>
    <h4 className='mb-3'>{t.Opportunity.opportunities}</h4>
    <div className="d-flex justify-content-end container mb-3">
      <Link href={'/opportunities/create'}>
        <button type="button" className=" btn btn-primary ">
          + {t.Account.add} {t.Opportunity.opportunity}
        </button>
      </Link>
    </div>
    <MemoizedTableMaterialUI columns={columns} data={memoizedSoporteActions} />
  </>
  )
}

export default OportunidadSearch