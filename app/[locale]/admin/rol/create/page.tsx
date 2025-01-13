import RolCreate from '@/app/[locale]/components/admin/rol/RolCreate';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import React from 'react';

async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <BasePages title="Rol">
      <RolCreate t={t} />
    </BasePages>
  );
}

export default page;
