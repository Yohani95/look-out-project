import React from 'react';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import ContactoProspectoSearch from '@/app/[locale]/components/prospecto/ProspectoContacto/ContactoProspectoSearch';
import { getAllContactoProspecto } from '@/app/actions/prospecto/ContactoProspectoActions';
async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await getAllContactoProspecto();
  return (
    <BasePages title={t.Common.prospect}>
      <ContactoProspectoSearch t={t} data={data} />
    </BasePages>
  );
}

export default page;
