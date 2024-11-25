import React from 'react';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getReunionProspectoById } from '@/app/actions/prospecto/ReunionProspectoActions';
import ReunionProspectoEdit from '@/app/[locale]/components/prospecto/reunion/ReunionProspectoEdit';
import { getAllEstadoReunionProspecto } from '@/app/actions/prospecto/EstadoReunionProspecto';
import EstadoReunionProspecto from '@/app/api/models/prospecto/EstadoReunionProspecto';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await getReunionProspectoById(params.id);
  const estados = await getAllEstadoReunionProspecto();
  const mappedEstadosReunion = estados.map((estado) => {
    return new EstadoReunionProspecto(estado).getSelectOptions();
  });
  return (
    <BasePages title={t.Common.prospectContact}>
      <ReunionProspectoEdit data={data} t={t} estados={mappedEstadosReunion} />
    </BasePages>
  );
}

export default page;
