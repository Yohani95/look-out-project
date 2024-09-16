import React from 'react';
import { useLocale } from 'next-intl';
import { getAllDocumentoLicenciaByIdLicencia } from '@/app/actions/licencia/DocumentoLicenciaActions';
import DocumentoLicencia from '@/app/api/models/licencia/DocumentoLicencia';
import DocumentoLicenciaSearch from '@/app/[locale]/components/licencia/documentoLicencia/DocumentoLicenciaSearch';
async function page({ params }) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = (await getAllDocumentoLicenciaByIdLicencia(
    params.id
  )) as DocumentoLicencia[];
  return <DocumentoLicenciaSearch t={t} data={data} idLicencia={params.id} />;
}
export default page;
