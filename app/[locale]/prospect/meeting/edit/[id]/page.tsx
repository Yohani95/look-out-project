import React from 'react';
import { useLocale } from 'next-intl';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getReunionProspectoById } from '@/app/actions/prospecto/ReunionProspectoActions';
import ReunionProspectoEdit from '@/app/[locale]/components/prospecto/reunion/ReunionProspectoEdit';
async function page({ params }) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await getReunionProspectoById(params.id);
  return (
    <BasePages title={t.Common.prospectContact}>
      <ReunionProspectoEdit data={data} t={t} />
    </BasePages>
  );
}

export default page;
