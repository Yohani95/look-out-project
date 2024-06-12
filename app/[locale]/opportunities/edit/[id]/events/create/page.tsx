import NovedadOportunidadCreate from '@/app/[locale]/components/oportunidad/NovedadOportunidad/NovedadOportunidadCreate';
import { useLocale } from 'next-intl';
import React from 'react'

function page({params}) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <>
        <NovedadOportunidadCreate t={t} idOportunidad={params.id}/>
    </>
  )
}

export default page