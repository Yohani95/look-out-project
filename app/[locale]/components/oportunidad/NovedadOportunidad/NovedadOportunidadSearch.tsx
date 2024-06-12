"use client"
import Link from 'next/link'
import React, { useMemo } from 'react'
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import NovedadOportunidad from '@/app/api/models/oportunidad/NovedadOportunidad';
import NovedadOportunidadButtons from './NovedadOportunidadButtons';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function NovedadOportunidadSearch({t,data,idOportunidad}) {
    const columns= useMemo(() =>NovedadOportunidad.createColumns(t), [t]);
    const memoizedSoporteActions = useMemo(() => {
        return data.map((novedad : NovedadOportunidad) => ({
          ...novedad,
          fecha: new NovedadOportunidad(novedad).getFechaString(),
          actions: (
           <>
           <NovedadOportunidadButtons novedad={novedad} t={t}/> 
           </>
          )
        }));
      }, [data, t]);
  return (
    <>
    <h4 className='mb-3'>{t.service.historyNovelty}</h4>
    <div className="d-flex justify-content-end container mb-3">
      <Link href={`/opportunities/edit/${idOportunidad}/events/create`}>
        <button type="button" className=" btn btn-primary ">
          + {t.Nav.services.createNovelty}
        </button>
      </Link>
    </div>
    <MemoizedTableMaterialUI columns={columns} data={memoizedSoporteActions} />
  </>
  )
}

export default NovedadOportunidadSearch