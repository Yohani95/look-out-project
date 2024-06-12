import DocumentoOportunidadCreate from '@/app/[locale]/components/oportunidad/DocumentoOportunidad/DocumentoOportunidadCreate'
import { useLocale } from 'next-intl';
import React from 'react'

function page({params}) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <>
        <DocumentoOportunidadCreate t={t} idOportunidad={params.id}/>
    </>
  )
}

export default page