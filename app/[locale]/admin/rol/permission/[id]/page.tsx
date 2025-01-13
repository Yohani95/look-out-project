import RolFuncionalidadCreate from '@/app/[locale]/components/admin/rol/rolFuncionalidad/RolFuncionalidadCreate';
import { getAllRolFuncionalidad } from '@/app/actions/admin/RolFuncionalidadActions';
import { getLocale } from 'next-intl/server';
import React from 'react';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await getAllRolFuncionalidad();
  return <RolFuncionalidadCreate data={data} t={t} />;
}

export default page;
