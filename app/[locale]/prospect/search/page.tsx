import React from 'react';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getAllProspecto } from '@/app/actions/prospecto/ProspectoActions';
import ProspectoSearch from '../../components/prospecto/ProspectoSearch';
import { getAllEstadoProspecto } from '@/app/actions/prospecto/EstadoProspectoActions';
async function page() {
  const locale = await getLocale();
  console.log(locale);
  const t = require(`@/messages/${locale}.json`);
  const data = await getAllProspecto();
  const listadoEstado = await getAllEstadoProspecto();
  return (
    <BasePages title={t.Common.prospect}>
      <ProspectoSearch t={t} data={data} listadoEstado={listadoEstado} />
    </BasePages>
  );
}

export default page;
