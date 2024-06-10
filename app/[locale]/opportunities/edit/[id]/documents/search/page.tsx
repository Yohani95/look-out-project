import React from 'react'
import { useLocale } from 'next-intl';
import DocumentoOportunidadSearch from '@/app/[locale]/components/oportunidad/DocumentoOportunidad/DocumentoOportunidadSearch';
import { getAllDocumentoOportunidadByIdOportunidad } from '@/app/actions/Oportunidad/DocumentoOportunidadActions';
import DocumentoOportunidad from '@/app/api/models/oportunidad/DocumentoOportunidad';
async function page({params}) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data= await getAllDocumentoOportunidadByIdOportunidad(params.id) as DocumentoOportunidad[];
  return (
    <DocumentoOportunidadSearch t={t} data={data} idOportunidad={params.id}/>
  )
}
export default page