'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import Oportunidad from '@/app/api/models/oportunidad/Oportunidad';
import OportunidadButtons from './OportunidadButtons';
import Persona from '@/app/api/models/admin/Persona';
import MultiSelect from '../common/MultiSelect';
import EstadoOportunidad from '@/app/api/models/oportunidad/EstadoOportunidad';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
const usePersistedState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

function OportunidadSearch({ t, data, listaestados }) {
  // Construir los filtros preseleccionados excluyendo "CERRADA_PERDIDA" y "CERRADA_GANADA"
  const preselectedFilters = Object.values(EstadoOportunidad.Constantes)
    .filter(
      (estado) =>
        estado !== EstadoOportunidad.Constantes.CERRADA_PERDIDA &&
        estado !== EstadoOportunidad.Constantes.CERRADA_GANADA &&
        estado !== EstadoOportunidad.Constantes.COMPROMETIDO
    )
    .map(String); // Convertir a cadenas

  const [selectedFilters, setSelectedFilters] = usePersistedState(
    'selectedOportunidadFilters',
    preselectedFilters
  ); // Inicializar con los filtros preseleccionados

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
      monto: oportunidad.monto + ' ' + oportunidad.moneda?.monNombre,
      actions: <OportunidadButtons oportunidad={oportunidad} t={t} />,
    }));
  }, [filteredData, t]);

  return (
    <div className="space-y-4">
      {/* Filtro por estado */}

      {/* Botón para crear nueva oportunidad */}
      <div className="d-flex justify-content-end">
        <MultiSelect
          label={t.Common.status}
          options={listaestados}
          selectedValues={selectedFilters}
          onChange={setSelectedFilters}
          placeholder={t.Common.status}
        />
        <Link href="/contact/create" passHref legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <button type="button" className="btn btn-secondary ml-2">
              {t.Common.contact}
            </button>
          </a>
        </Link>

        <Link href={'/opportunities/create'}>
          <button type="button" className="btn btn-primary ml-2">
            {t.Account.add} {t.Opportunity.opportunity}
          </button>
        </Link>
      </div>
      {/* Botón para crear nuevo contacto */}
      {/* Tabla filtrada */}
      <MemoizedTableMaterialUI columns={columns} data={memoizedActions} />
    </div>
  );
}

export default OportunidadSearch;
