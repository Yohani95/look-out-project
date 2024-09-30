import NovedadOportunidadEdit from '@/app/[locale]/components/oportunidad/NovedadOportunidad/NovedadOportunidadEdit';
import { getNovedadOportunidadById } from '@/app/actions/Oportunidad/NovedadOportunidadActions';
import { getLocale } from 'next-intl/server';
import React from 'react';

async function page({ params }) {
  const novedad = await getNovedadOportunidadById(params.id_event);
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <>
      <NovedadOportunidadEdit
        novedad={novedad}
        idOportunidad={params.id}
        t={t}
      />
    </>
  );
}

export default page;
