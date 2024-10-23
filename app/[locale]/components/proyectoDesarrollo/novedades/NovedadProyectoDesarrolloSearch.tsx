'use client';

import Link from 'next/link';
import React, { useMemo } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import NovedadProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/NovedadProyectoDesarrollo';
import NovedadProyectoDesarrolloButtons from './NovedadProyectoDesarrolloButtons';
import Utils from '@/app/api/models/common/Utils';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

function NovedadProyectoDesarrolloSearch({ t, data, idProyectoDesarrollo }) {
  const columns = useMemo(
    () => NovedadProyectoDesarrollo.createColumns(t),
    [t]
  );

  const memoizedActions = useMemo(() => {
    return data.map((novedad: NovedadProyectoDesarrollo) => ({
      ...novedad,
      fechaCreacion: Utils.getFechaString(novedad.fechaCreacion),
      actions: (
        <>
          <NovedadProyectoDesarrolloButtons novedad={novedad} t={t} />
        </>
      ),
    }));
  }, [data, t]);

  return (
    <>
      {/* <h4 className="mb-3">{t.Common.novelty}</h4> */}
      <div className="d-flex justify-content-end container mb-3">
        <Link
          href={`/developmentProject/${idProyectoDesarrollo}/novelty/create`}
        >
          <button type="button" className="btn btn-primary">
            + {t.Nav.services.createNovelty}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI columns={columns} data={memoizedActions} />
    </>
  );
}

export default NovedadProyectoDesarrolloSearch;
