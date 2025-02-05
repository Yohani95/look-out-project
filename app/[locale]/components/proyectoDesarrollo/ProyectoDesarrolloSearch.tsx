'use client';

import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import ProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProyectoDesarrollo';
import ProyectoDesarrolloButtons from './ProyectoDesarrolloButtons';
import Persona from '@/app/api/models/admin/Persona';
import Utils from '@/app/api/models/common/Utils';
import EtapaProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/EtapaProyectoDesarrollo';
import MultiSelect from '../common/MultiSelect';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

function ProyectoDesarrolloSearch({ t, data, listaEtapa }) {
  const preselectedFilters = Object.values(EtapaProyectoDesarrollo.Constantes)
    .filter(
      (etapa) =>
        etapa !== EtapaProyectoDesarrollo.Constantes.CANCELADO &&
        etapa !== EtapaProyectoDesarrollo.Constantes.SUSPENDIDO &&
        etapa !== EtapaProyectoDesarrollo.Constantes.ARCHIVADO
    )
    .map(String); // Convertir a cadenas

  const [selectedFilters, setSelectedFilters] = useState(preselectedFilters);
  // Filtrar datos según los filtros seleccionados
  const filteredData = useMemo(() => {
    if (selectedFilters.length === 0) return data; // Si no hay filtros, mostrar todo
    return data.filter((proyecto) =>
      selectedFilters.includes(proyecto.idEtapa.toString())
    );
  }, [data, selectedFilters]);
  const columns = useMemo(() => ProyectoDesarrollo.createColumns(t), [t]);
  const memoizedActions = useMemo(() => {
    return filteredData.map((proyecto: ProyectoDesarrollo) => ({
      ...proyecto,
      fechaCierre: Utils.getFechaString(proyecto.fechaCierre),
      personaKam: data.personaKam
        ? new Persona(data.personaKam).getNombreCompleto()
        : 'N/A',
      jefe: proyecto.jefeProyecto
        ? new Persona(proyecto.jefeProyecto).getNombreCompleto()
        : 'N/A',
      actions: (
        <>
          <ProyectoDesarrolloButtons proyecto={proyecto} t={t} />
        </>
      ),
    }));
  }, [filteredData, t]);

  return (
    <>
      <MultiSelect
        label={t.project.stages}
        options={listaEtapa}
        selectedValues={selectedFilters}
        onChange={setSelectedFilters}
        placeholder={t.project.stages}
      />
      <div className="d-flex justify-content-end container mb-3">
        {/* Filtro por etapa */}
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
