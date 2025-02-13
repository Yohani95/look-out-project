import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import OportunidadSearch from '../../components/oportunidad/OportunidadSearch';
import { getAllOportunidad } from '@/app/actions/Oportunidad/OportunidadActions';
import Oportunidad from '@/app/api/models/oportunidad/Oportunidad';
import { getAllEstadoOportunidad } from '@/app/actions/Oportunidad/EstadoOportunidad';
async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = (await getAllOportunidad()) as Oportunidad;
  const listaestados = await getAllEstadoOportunidad();

  return (
    <BasePages
      title={t.Opportunity.opportunities}
      description={t.Opportunity.description}
    >
      <OportunidadSearch t={t} data={data} listaestados={listaestados} />
    </BasePages>
  );
}

export default page;
