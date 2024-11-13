'use client';

import Link from 'next/link';
import React, { useMemo } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import PlanificacionProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/PlanificacionProyectoDesarrollo';
import PlanificacionProyectoDesarrolloButtons from './PlanificacionProyectoDesarrolloButtons';
import Utils from '@/app/api/models/common/Utils';
import { FaCheck, FaTimes } from 'react-icons/fa';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

function PlanificacionProyectoDesarrolloSearch({
  t,
  data,
  idProyectoDesarrollo,
}) {
  const columns = useMemo(
    () => PlanificacionProyectoDesarrollo.createColumns(t),
    [t]
  );
  const memoizedActions = useMemo(() => {
    return data.map((planificacion: PlanificacionProyectoDesarrollo) => ({
      ...planificacion,
      terminado: planificacion.terminado ? (
        <FaCheck color="green" />
      ) : (
        <FaTimes color="#2f4bce" />
      ),
      fechaInicio: Utils.getFechaString(planificacion.fechaInicio),
      fechaTermino: Utils.getFechaString(planificacion.fechaTermino),
      fechaActividad: Utils.getFechaString(planificacion.fechaActividad),
      fechaTerminoReal: Utils.getFechaString(planificacion.fechaTerminoReal),
      actions: (
        <>
          <PlanificacionProyectoDesarrolloButtons
            planificacion={planificacion}
            t={t}
          />
        </>
      ),
    }));
  }, [data, t]);

  return (
    <>
      <div className="d-flex justify-content-end container mb-3">
        <Link
          href={`/developmentProject/${idProyectoDesarrollo}/planning/create`}
        >
          <button type="button" className="btn btn-primary">
            + {t.Common.add} {t.Common.planning}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI columns={columns} data={memoizedActions} />
    </>
  );
}

export default PlanificacionProyectoDesarrolloSearch;
