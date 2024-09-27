import React from 'react';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getAllProspecto } from '@/app/actions/prospecto/ProspectoActions';
import ProspectoSearch from '../../components/prospecto/ProspectoSearch';
async function page() {
  const locale = await getLocale();
  console.log(locale);
  const t = require(`@/messages/${locale}.json`);
  const data = await getAllProspecto();
  return (
    <BasePages title={t.Common.prospect}>
      <ProspectoSearch t={t} data={data} />
    </BasePages>
  );
}

export default page;
