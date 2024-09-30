'use client';
import Link from 'next/link';
import React, { useMemo } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import DocumentoLicencia from '@/app/api/models/licencia/DocumentoLicencia';
import DocumentoLicenciaButtons from './DocumentoLicenciaButtons';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function DocumentoLicenciaSearch({ t, data, idLicencia }) {
  const columns = useMemo(() => DocumentoLicencia.createColumns(t), [t]);
  const memoizedSoporteActions = useMemo(() => {
    return data.map((documento: DocumentoLicencia) => ({
      ...documento,
      actions: (
        <>
          <DocumentoLicenciaButtons documento={documento} t={t} />
        </>
      ),
    }));
  }, [data, t]);
  return (
    <>
      <h4 className="mb-3">{t.Common.documents}</h4>
      <div className="d-flex justify-content-end container mb-3">
        <Link href={`/licenses/edit/${idLicencia}/documents/create`}>
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

export default DocumentoLicenciaSearch;
