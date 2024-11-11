'use client';
import Link from 'next/link';
import React, { useMemo } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import DocumentoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/DocumentoProyectoDesarrollo';
import DocumentoProyectoDesarrolloButtons from './DocumentoProyectoDesarrolloButtons';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function DocumentoProyectoDesarrolloSearch({ t, data, idProyectoDesarrollo }) {
  const columns = useMemo(
    () => DocumentoProyectoDesarrollo.createColumns(t),
    [t]
  );
  const memoizedSoporteActions = useMemo(() => {
    return data.map((documento: DocumentoProyectoDesarrollo) => ({
      ...documento,
      actions: (
        <>
          <DocumentoProyectoDesarrolloButtons documento={documento} t={t} />
        </>
      ),
    }));
  }, [data, t]);
  return (
    <>
      <h4 className="mb-3">{t.Common.documents}</h4>
      <div className="d-flex justify-content-end container mb-3">
        <Link
          href={`/developmentProject/${idProyectoDesarrollo}/documents/create`}
        >
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

export default DocumentoProyectoDesarrolloSearch;
