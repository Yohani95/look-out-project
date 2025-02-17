'use client';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import VentaLicencia from '@/app/api/models/licencia/VentaLicencia';
import Utils from '@/app/api/models/common/Utils';
import VentaLicenciaButtons from './VentaLicenciaButtons';
import MultiSelect from '../common/MultiSelect';
import EstadoVentaLicencia from '@/app/api/models/licencia/EstadoVentaLicencia';
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
function VentaLicenciaSearch({ t, data, listaestados }) {
  // Construir los filtros preseleccionados excluyendo "PERDIDA" y "GANADA"
  const preselectedFilters = Object.values(EstadoVentaLicencia.Constantes)
    .filter(
      (estado) =>
        estado !== EstadoVentaLicencia.Constantes.PERDIDA &&
        estado !== EstadoVentaLicencia.Constantes.GANADA
    )
    .map(String); // Convertir a cadenas

  const columns = useMemo(() => VentaLicencia.createColumns(t), [t]);
  const [selectedFilters, setSelectedFilters] = usePersistedState(
    'selectedOportunidadFilters',
    preselectedFilters
  );
  // Filtrar datos según los filtros seleccionados
  const filteredData = useMemo(() => {
    if (selectedFilters.length === 0) return data; // Si no hay filtros, mostrar todo
    return data.filter((licencia) =>
      selectedFilters.includes(licencia.idEstado.toString())
    );
  }, [data, selectedFilters]);

  const memoizedActions = useMemo(() => {
    return filteredData.map((licencia: VentaLicencia) => ({
      ...licencia,
      fechaCreacion: Utils.getFechaString(licencia.fechaCreacion),
      fechaCierre: Utils.getFechaString(licencia.fechaCierre),
      fechaRenovacion: Utils.getFechaString(licencia.fechaRenovacion),
      actions: <VentaLicenciaButtons licencia={licencia} t={t} />,
    }));
  }, [filteredData, t]);
  return (
    <>
      <div className="space-y-4">
        <div className="d-flex justify-content-end space-x-4 mb-3">
          <MultiSelect
            label={t.Common.status}
            options={listaestados}
            selectedValues={selectedFilters}
            onChange={setSelectedFilters}
            placeholder={t.Common.status}
          />
          <Link href={'/licenses/create'}>
            <button type="button" className=" btn btn-primary ">
              + {t.Account.add} {t.Common.license}
            </button>
          </Link>
        </div>
        <MemoizedTableMaterialUI columns={columns} data={memoizedActions} />
      </div>
    </>
  );
}

export default VentaLicenciaSearch;
