"use client"
import Link from 'next/link'
import React, { useMemo } from 'react'
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import VentaLicencia from '@/app/api/models/licencia/VentaLicencia';
import Utils from '@/app/api/models/common/Utils';
import VentaLicenciaButtons from './VentaLicenciaButtons';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function VentaLicenciaSearch({ t, data }) {
  const columns = useMemo(() => VentaLicencia.createColumns(t), [t]);
  const memoizedSoporteActions = useMemo(() => {
    return data.map((licencia: VentaLicencia) => ({
      ...licencia,
      fechaCreacion: Utils.getFechaString(licencia.fechaCreacion),
      fechaCierre: Utils.getFechaString(licencia.fechaCierre),
      fechaRenovacion: Utils.getFechaString(licencia.fechaRenovacion),
      // personaKam: licencia.personaKam ? new Persona(licencia.personaKam).getNombreCompleto() : "N/A",
      actions: (
        <>
          <VentaLicenciaButtons licencia={licencia} t={t} />
        </>
      )
    }));
  }, [data, t]);
  return (
    <>
    <h4 className='mb-3'>{t.Common.licenses}</h4>
    <div className="d-flex justify-content-end container mb-3">
      <Link href={'/licenses/create'}>
        <button type="button" className=" btn btn-primary ">
          + {t.Account.add} {t.Common.license}
        </button>
      </Link>
    </div>
    <MemoizedTableMaterialUI columns={columns} data={memoizedSoporteActions} />
  </>
  )
}

export default VentaLicenciaSearch