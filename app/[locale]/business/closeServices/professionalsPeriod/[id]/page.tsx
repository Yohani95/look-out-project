import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import PeriodosProfessionals from '@/app/[locale]/components/business/Services/periodos/PeriodosProfessionals';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <BasePages title={t.service.periodDetails}>
      <h4 className="mb-3">{t.service.periodDetails}</h4>
      <PeriodosProfessionals data={''} t={t} idPeriodo={params.id} />
    </BasePages>
  );
}

export default page;
