'use client';
import Link from 'next/link';
import React, { useMemo } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import VentaLicencia from '@/app/api/models/licencia/VentaLicencia';
import Utils from '@/app/api/models/common/Utils';
import TarifarioVentaLicencia from '@/app/api/models/licencia/TarifarioVentaLicencia';
import TarifarioVentaLicenciaButtons from './TarifarioVentaLicenciaButtons';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function TarifarioVentaLicenciaSearch({ t, data }) {
  const columns = useMemo(() => TarifarioVentaLicencia.createColumns(t), [t]);
  const memoizedSoporteActions = useMemo(() => {
    return data?.map((tarifario: TarifarioVentaLicencia) => ({
      ...tarifario,
      fechaVigencia: Utils.getFechaString(tarifario.fechaVigencia),
      fechaTermino: Utils.getFechaString(tarifario.fechaTermino),
      actions: (
        <>
          <TarifarioVentaLicenciaButtons tarifario={tarifario} t={t} />
        </>
      ),
    }));
  }, [data, t]);
  return (
    <>
      <hr />
      {/* <h4 className='mb-3'>{t.business.agreedRate}</h4> */}
      <MemoizedTableMaterialUI
        columns={columns}
        data={memoizedSoporteActions}
      />
    </>
  );
}

export default TarifarioVentaLicenciaSearch;
