'use client';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import VentaLicencia from '@/app/api/models/licencia/VentaLicencia';
import Utils from '@/app/api/models/common/Utils';
import VentaLicenciaButtons from './VentaLicenciaButtons';
import MultiSelect from '../common/MultiSelect';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function VentaLicenciaSearch({ t, data, listaestados }) {
  const columns = useMemo(() => VentaLicencia.createColumns(t), [t]);
  const [selectedFilters, setSelectedFilters] = useState([]); // Manejar selección múltiple
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
      // personaKam: licencia.personaKam ? new Persona(licencia.personaKam).getNombreCompleto() : "N/A",
      actions: (
        <>
          <VentaLicenciaButtons licencia={licencia} t={t} />
        </>
      ),
    }));
  }, [filteredData, t]);
  return (
    <>
      {' '}
      {/* Filtro por estado */}
      <MultiSelect
        label={t.Common.status}
        options={listaestados}
        selectedValues={selectedFilters}
        onChange={setSelectedFilters}
        placeholder={t.Common.status}
      />
      <div className="d-flex justify-content-end container mb-3">
        <Link href={'/licenses/create'}>
          <button type="button" className=" btn btn-primary ">
            + {t.Account.add} {t.Common.license}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI columns={columns} data={memoizedActions} />
    </>
  );
}

export default VentaLicenciaSearch;
