'use client';
import Link from 'next/link';
import React, { useMemo } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import DocumentoOportunidad from '@/app/api/models/oportunidad/DocumentoOportunidad';
import DocumentoOportunidadButtons from './DocumentoOportunidadButtons';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function DocumentoOportunidadSearch({ t, data, idOportunidad }) {
  const columns = useMemo(() => DocumentoOportunidad.createColumns(t), [t]);
  const memoizedSoporteActions = useMemo(() => {
    return data.map((documento: DocumentoOportunidad) => ({
      ...documento,
      actions: (
        <>
          <DocumentoOportunidadButtons documento={documento} t={t} />
        </>
      ),
    }));
  }, [data, t]);
  return (
    <>
      <div className="d-flex justify-content-end container mb-3">
        <Link href={`/opportunities/edit/${idOportunidad}/documents/create`}>
          <button type="button" className=" btn btn-primary ">
            + {t.Account.add} {t.Common.document}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI
        columns={columns}
        data={memoizedSoporteActions}
      />
    </>
  );
}

export default DocumentoOportunidadSearch;
