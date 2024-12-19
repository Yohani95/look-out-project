import React from 'react';
import { getLocale } from 'next-intl/server';
import ListSupport from '@/app/[locale]/components/support/ListSupport';
import { Constantes } from '@/app/api/models/common/Constantes';
import { GetAllEntitiesByIdTipoSoporte } from '@/app/api/actions/soporte/SoporteActions';
import Soporte from '@/app/api/models/support/Soporte';
async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const soportes = (await GetAllEntitiesByIdTipoSoporte(
    Constantes.TipoSorpote.ONDEMAND
  )) as Soporte[];
  return (
    <ListSupport t={t} data={soportes} tipo={Constantes.TipoSorpote.ONDEMAND} />
  );
}

export default page;
