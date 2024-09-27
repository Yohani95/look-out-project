import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
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
    <BasePages title={t.support.onDemandSupport}>
      <ListSupport
        t={t}
        data={soportes}
        tipo={Constantes.TipoSorpote.ONDEMAND}
      />
    </BasePages>
  );
}

export default page;
