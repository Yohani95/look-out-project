'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import Oportunidad from '@/app/api/models/oportunidad/Oportunidad';
import OportunidadButtons from './OportunidadButtons';
import Persona from '@/app/api/models/admin/Persona';
import MultiSelect from '../common/MultiSelect';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

function OportunidadSearch({ t, data, listaestados }) {
  const [selectedFilters, setSelectedFilters] = useState([]); // Manejar selección múltiple
  // Filtrar datos según los filtros seleccionados
  const filteredData = useMemo(() => {
    if (selectedFilters.length === 0) return data; // Si no hay filtros, mostrar todo
    return data.filter((oportunidad) =>
      selectedFilters.includes(oportunidad.idEstadoOportunidad.toString())
    );
  }, [data, selectedFilters]);

  const columns = useMemo(() => Oportunidad.createColumns(t), [t]);

  const memoizedActions = useMemo(() => {
    return filteredData.map((oportunidad: Oportunidad) => ({
      ...oportunidad,
      fechaCierre: new Oportunidad(oportunidad).getFechaString(),
      fechaCreacion: new Oportunidad(oportunidad).getFechaString(
        oportunidad.fechaCreacion
      ),
      personaKam: oportunidad.personaKam
        ? new Persona(oportunidad.personaKam).getNombreCompleto()
        : 'N/A',
      actions: <OportunidadButtons oportunidad={oportunidad} t={t} />,
    }));
  }, [filteredData, t]);

  return (
    <div className="space-y-4">
      {/* Filtro por estado */}
      <MultiSelect
        label={t.Common.status}
        options={listaestados}
        selectedValues={selectedFilters}
        onChange={setSelectedFilters}
        placeholder={t.Common.status}
      />

      {/* Botón para crear nueva oportunidad */}
      <div className="d-flex justify-content-end">
        <Link href={'/opportunities/create'}>
          <button type="button" className="btn btn-primary">
            + {t.Account.add} {t.Opportunity.opportunity}
          </button>
        </Link>
      </div>

      {/* Tabla filtrada */}
      <MemoizedTableMaterialUI columns={columns} data={memoizedActions} />
    </div>
  );
}

export default OportunidadSearch;
