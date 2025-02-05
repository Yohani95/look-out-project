'use client';

import Link from 'next/link';
import React, { useMemo } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import RegistroHorasProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/RegistroHorasProyectoDesarrollo';
import RegistroHorasProyectoDesarrolloButtons from './RegistroHorasProyectoDesarrolloButtons';
import Utils from '@/app/api/models/common/Utils';
import { useRouter } from 'next/navigation';
import Persona from '@/app/api/models/admin/Persona';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

function RegistroHorasProyectoDesarrolloSearch({
  t,
  data,
  idProfesionalProyecto,
}) {
  const columns = useMemo(
    () => RegistroHorasProyectoDesarrollo.createColumns(t),
    [t]
  );
  const router = useRouter();
  const memoizedActions = useMemo(() => {
    return data.map((registro: RegistroHorasProyectoDesarrollo) => ({
      ...registro,
      semana: Utils.getFechaString(registro.semana),
      nombre: new Persona(
        registro.profesionalProyecto.persona
      ).getNombreCompleto(),
      actions: (
        <RegistroHorasProyectoDesarrolloButtons registro={registro} t={t} />
      ),
    }));
  }, [data, t]);

  return (
    <>
      <div className="d-flex justify-content-end container mb-3">
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => router.back()}
        >
          {t.Common.goBack}
        </button>
        <Link
          href={`/developmentProject/hours/${idProfesionalProyecto}/create`}
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

export default RegistroHorasProyectoDesarrolloSearch;
