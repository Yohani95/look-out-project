import React from 'react';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import LlamadaProspectoEdit from '@/app/[locale]/components/prospecto/llamada/LlamadaProspectoEdit';
import { getLlamadaProspectoById } from '@/app/actions/prospecto/LlamadaProspectoActions';
import MedioLlamadaProspecto from '@/app/api/models/prospecto/MedioLlamadaProspecto';
import { getAllMedioLlamadaProspecto } from '@/app/actions/prospecto/MedioLlamadaProspectoActions';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id);
  return (
    <BasePages title={t.Common.prospectContact}>
      <LlamadaProspectoEdit data={data} t={t} />
    </BasePages>
  );
}
const GetData = async (id) => {
  try {
    const [llamada, medioLlamada] = await Promise.all([
      getLlamadaProspectoById(id),
      getAllMedioLlamadaProspecto(),
    ]);
    const mappedMedioLlamadaProspecto = medioLlamada.map((medio) => {
      return new MedioLlamadaProspecto(medio).getSelectOptions();
    });
    return {
      llamada,
      medioLlamada: mappedMedioLlamadaProspecto,
    };
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default page;
