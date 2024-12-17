'use client';

import Link from 'next/link';
import React, { useMemo } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import ProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProyectoDesarrollo';
import ProyectoDesarrolloButtons from './ProyectoDesarrolloButtons';
import Persona from '@/app/api/models/admin/Persona';
import Utils from '@/app/api/models/common/Utils';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

function ProyectoDesarrolloSearch({ t, data }) {
  const columns = useMemo(() => ProyectoDesarrollo.createColumns(t), [t]);

  const memoizedActions = useMemo(() => {
    return data.map((proyecto: ProyectoDesarrollo) => ({
      ...proyecto,
      fechaCierre: Utils.getFechaString(proyecto.fechaCierre),
      personaKam: data.personaKam
        ? new Persona(data.personaKam).getNombreCompleto()
        : 'N/A',
      actions: (
        <>
          <ProyectoDesarrolloButtons proyecto={proyecto} t={t} />
        </>
      ),
    }));
  }, [data, t]);

  return (
    <>
      <div className="d-flex justify-content-end container mb-3">
        <Link href={'/developmentProject/create'}>
          <button type="button" className="btn btn-primary">
            + {t.Account.add} {t.Common.project}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI columns={columns} data={memoizedActions} />
    </>
  );
}

export default ProyectoDesarrolloSearch;
