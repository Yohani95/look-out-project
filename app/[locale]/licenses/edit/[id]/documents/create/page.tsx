import DocumentoLicenciaCreate from '@/app/[locale]/components/licencia/documentoLicencia/DocumentoLicenciaCreate';
import { useLocale } from 'next-intl';
import React from 'react';

function page({ params }) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <>
      <DocumentoLicenciaCreate t={t} idLicencia={params.id} />
    </>
  );
}

export default page;
