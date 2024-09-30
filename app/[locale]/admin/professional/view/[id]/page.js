import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import fetchCountriest from '@/app/[locale]/utils/country/Countrylist';
import { fetchGetbyId } from '@/app/[locale]/utils/person/UtilsPerson';
import ProfessionalsView from '@/app/[locale]/components/admin/professionals/ProfessionalsView';
async function page({ params }) {
  const persona = await fetchGetbyId(params.id);
  const data = await fetchCountriest().then((pais) => {
    const options = pais.map((country) => ({
      value: country.paiId,
      label: country.paiNombre,
    }));
    return options;
  });
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <BasePages title={`${t.Common.professionals}`}>
      <ProfessionalsView t={t} data={data} persona={persona} />
    </BasePages>
  );
}

export default page;
