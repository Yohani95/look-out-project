import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { useLocale } from 'next-intl';
import OportunidadSearch from '../../components/oportunidad/OportunidadSearch';
import { getAllOportunidad } from '@/app/actions/Oportunidad/OportunidadActions';
import Oportunidad from '@/app/api/models/oportunidad/Oportunidad';
async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = (await getAllOportunidad()) as Oportunidad;
  return (
    <BasePages title={t.Opportunity.opportunities}>
      <OportunidadSearch t={t} data={data} />
    </BasePages>
  );
}

export default page;
