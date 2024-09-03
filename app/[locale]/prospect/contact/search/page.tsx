import React from 'react';
import { useLocale } from 'next-intl';
import BasePages from '@/app/[locale]/components/common/BasePages';
import ContactoProspectoSearch from '@/app/[locale]/components/prospecto/ProspectoContacto/ContactoProspectoSearch';
import { getAllContactoProspecto } from '@/app/actions/prospecto/ContactoProspectoActions';
async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await getAllContactoProspecto();
  return (
    <BasePages title={t.Common.prospect}>
      <ContactoProspectoSearch t={t} data={data} />
    </BasePages>
  );
}

export default page;
