import RolCreate from '@/app/[locale]/components/admin/rol/RolCreate';
import RolEdit from '@/app/[locale]/components/admin/rol/RolEdit';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getRolById } from '@/app/actions/admin/RolActions';
import { getLocale } from 'next-intl/server';
import React from 'react';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const rol = await getRolById(params.id);
  return (
    <BasePages title="Rol">
      <RolEdit id={params.id} rol={rol} t={t} />
    </BasePages>
  );
}

export default page;
