'use client';

import Link from 'next/link';
import React, { useMemo } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import HitoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/HitoProyectoDesarrollo';
import HitoProyectoDesarrolloButtons from './HitoProyectoDesarrolloButtons';
import Utils from '@/app/api/models/common/Utils';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

function HitoProyectoDesarrolloSearch({ t, data, idProyectoDesarrollo }) {
  const columns = useMemo(() => HitoProyectoDesarrollo.createColumns(t), [t]);

  const memoizedActions = useMemo(() => {
    return data.map((hito: HitoProyectoDesarrollo) => ({
      ...hito,
      fechaCreacion: Utils.getFechaString(hito.fechaCreacion),
      actions: (
        <>
          <HitoProyectoDesarrolloButtons hito={hito} t={t} />
        </>
      ),
    }));
  }, [data, t]);

  return (
    <>
      {/* <h4 className="mb-3">{t.Common.milestone}</h4> */}
      <div className="d-flex justify-content-end container mb-3">
        <Link
          href={`/developmentProject/${idProyectoDesarrollo}/milestone/create`}
        >
          <button type="button" className="btn btn-primary">
            + {t.Account.add} {t.Common.milestone}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI columns={columns} data={memoizedActions} />
    </>
  );
}

export default HitoProyectoDesarrolloSearch;
