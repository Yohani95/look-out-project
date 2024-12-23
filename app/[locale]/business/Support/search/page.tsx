import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import ListSupport from '@/app/[locale]/components/support/ListSupport';
import {
  GetAllEntitiesByIdTipoSoporte,
  GetAllEntitiesSoporte,
} from '@/app/api/actions/soporte/SoporteActions';
import Soporte from '@/app/api/models/support/Soporte';
import { Constantes } from '@/app/api/models/common/Constantes';

async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const soportes = (await GetAllEntitiesByIdTipoSoporte(
    Constantes.TipoSorpote.CONTRATO
  )) as Soporte[];
  return <ListSupport t={t} data={soportes} />;
}

export default page;
