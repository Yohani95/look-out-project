'use client';
import Link from 'next/link';
import React, { useMemo } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import Oportunidad from '@/app/api/models/oportunidad/Oportunidad';
import OportunidadButtons from './OportunidadButtons';
import Persona from '@/app/api/models/admin/Persona';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function OportunidadSearch({ t, data }) {
  const columns = useMemo(() => Oportunidad.createColumns(t), [t]);
  const memoizedActions = useMemo(() => {
    return data.map((oportunidad: Oportunidad) => ({
      ...oportunidad,
      fechaCierre: new Oportunidad(oportunidad).getFechaString(),
      fechaCreacion: new Oportunidad(oportunidad).getFechaString(
        oportunidad.fechaCreacion
      ),
      personaKam: oportunidad.personaKam
        ? new Persona(oportunidad.personaKam).getNombreCompleto()
        : 'N/A',
      actions: (
        <>
          <OportunidadButtons oportunidad={oportunidad} t={t} />
        </>
      ),
    }));
  }, [data, t]);
  return (
    <>
      <h4 className="mb-3">{t.Opportunity.opportunities}</h4>
      <div className="d-flex justify-content-end container mb-3">
        <Link href={'/opportunities/create'}>
          <button type="button" className=" btn btn-primary ">
            + {t.Account.add} {t.Opportunity.opportunity}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI columns={columns} data={memoizedActions} />
    </>
  );
}

export default OportunidadSearch;
