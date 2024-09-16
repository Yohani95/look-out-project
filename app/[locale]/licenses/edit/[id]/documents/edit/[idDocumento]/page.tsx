import DocumentoLicenciaEdit from '@/app/[locale]/components/licencia/documentoLicencia/DocumentoLicenciaEdit';
import { getdocumentoLicenciaById } from '@/app/actions/licencia/DocumentoLicenciaActions';
import { useLocale } from 'next-intl';
import React from 'react';

async function page({ params }) {
  const documento = await getdocumentoLicenciaById(params.idDocumento);
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <>
      <DocumentoLicenciaEdit
        documento={documento}
        idLicencia={params.id}
        t={t}
      />
    </>
  );
}

export default page;
