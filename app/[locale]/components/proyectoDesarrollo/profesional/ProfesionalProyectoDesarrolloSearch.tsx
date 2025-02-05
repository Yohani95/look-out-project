'use client';

import Link from 'next/link';
import React, { useMemo } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import ProfesionalProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProfesionalProyectoDesarrollo';
import ProfesionalProyectoDesarrolloButtons from './ProfesionalProyectoDesarrolloButtons';
import Utils from '@/app/api/models/common/Utils';
import Persona from '@/app/api/models/admin/Persona';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

function ProfesionalProyectoDesarrolloSearch({
  t,
  data,
  idProyectoDesarrollo,
}) {
  const columns = useMemo(
    () => ProfesionalProyectoDesarrollo.createColumns(t),
    [t]
  );

  const memoizedActions = useMemo(() => {
    return data.map((profesional: ProfesionalProyectoDesarrollo) => ({
      ...profesional,
      fechaInicio: Utils.getFechaString(profesional.fechaInicio),
      fechaTermino: Utils.getFechaString(profesional.fechaTermino),
      nombre: new Persona(profesional.persona).getNombreCompleto(),
      actions: (
        <ProfesionalProyectoDesarrolloButtons profesional={profesional} t={t} />
      ),
    }));
  }, [data, t]);

  return (
    <>
      <div className="d-flex justify-content-end container mb-3">
        <Link
          href={`/developmentProject/${idProyectoDesarrollo}/professional/create`}
        >
          <button type="button" className="btn btn-primary">
            + {t.Common.add}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI columns={columns} data={memoizedActions} />
    </>
  );
}

export default ProfesionalProyectoDesarrolloSearch;
