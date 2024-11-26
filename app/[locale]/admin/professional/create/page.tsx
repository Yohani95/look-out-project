import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import fetchCountriest from '@/app/[locale]/utils/country/Countrylist';
import { getAllPerfil } from '@/app/actions/admin/PerfilActions';
import Perfil from '@/app/api/models/admin/Perfil';
import ProfessionalsCreate from '@/app/[locale]/components/admin/professionals/ProfessionalsCreate';
async function page() {
  const data = await fetchCountriest().then((pais) => {
    const options = pais.map((country) => ({
      value: country.paiId,
      label: country.paiNombre,
    }));
    return options;
  });
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);

  const perfiles = await getAllPerfil();
  const mappedPerfil = perfiles.map((perfil) => {
    return new Perfil(perfil).getSelectOptions();
  });
  return (
    <BasePages title={`${t.Common.create} ${t.Common.professionals}`}>
      <ProfessionalsCreate
        locale={locale}
        data={data}
        perfiles={mappedPerfil}
      />
    </BasePages>
  );
}

export default page;
