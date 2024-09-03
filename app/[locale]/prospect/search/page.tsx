import React from 'react';
import { useLocale } from 'next-intl';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getAllProspecto } from '@/app/actions/prospecto/ProspectoActions';
import ProspectoSearch from '../../components/prospecto/ProspectoSearch';
async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await getAllProspecto();
  return (
    <BasePages title={t.Common.prospect}>
      <ProspectoSearch t={t} data={data} />
    </BasePages>
  );
}

export default page;
