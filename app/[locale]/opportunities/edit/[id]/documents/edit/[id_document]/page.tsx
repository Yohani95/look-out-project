import DocumentoOportunidadEdit from '@/app/[locale]/components/oportunidad/DocumentoOportunidad/DocumentoOportunidadEdit';
import { getdocumentoOportunidadById } from '@/app/actions/Oportunidad/DocumentoOportunidadActions';
import { getLocale } from 'next-intl/server';
import React from 'react';

async function page({ params }) {
  const documento = await getdocumentoOportunidadById(params.id_document);
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <>
      <DocumentoOportunidadEdit
        documento={documento}
        idOportunidad={params.id}
        t={t}
      />
    </>
  );
}

export default page;
