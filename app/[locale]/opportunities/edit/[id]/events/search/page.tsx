import React from 'react';
import { getLocale } from 'next-intl/server';
import NovedadOportunidadSearch from '@/app/[locale]/components/oportunidad/NovedadOportunidad/NovedadOportunidadSearch';
import { getAllNovedadOportunidadByIdOportunidad } from '@/app/actions/Oportunidad/NovedadOportunidadActions';
import NovedadOportunidad from '@/app/api/models/oportunidad/NovedadOportunidad';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = (await getAllNovedadOportunidadByIdOportunidad(
    params.id
  )) as NovedadOportunidad[];
  return (
    <NovedadOportunidadSearch t={t} data={data} idOportunidad={params.id} />
  );
}
export default page;
