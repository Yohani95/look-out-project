import React from 'react';
import BasePages from '../../components/common/BasePages';
import { getLocale } from 'next-intl/server';
import ActiveProfessionals from '../../components/admin/professionals/ActiveProfessionals';

async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <BasePages title={`${t.service.assignedProfessionals}`}>
      <ActiveProfessionals t={t} />
    </BasePages>
  );
}

export default page;
