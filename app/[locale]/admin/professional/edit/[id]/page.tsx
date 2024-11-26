import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import fetchCountriest from '@/app/[locale]/utils/country/Countrylist';
import { fetchGetbyId } from '@/app/[locale]/utils/person/UtilsPerson';
import { getAllPerfil } from '@/app/actions/admin/PerfilActions';
import Perfil from '@/app/api/models/admin/Perfil';
import ProfessionalsEdit from '@/app/[locale]/components/admin/professionals/ProfessionalsEdit';
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
  const perfiles = await getAllPerfil();
  const mappedPerfil = perfiles.map((perfil) => {
    return new Perfil(perfil).getSelectOptions();
  });
  return (
    <BasePages title={`${t.Common.professionals}`}>
      <ProfessionalsEdit
        locale={locale}
        data={data}
        persona={persona}
        perfiles={mappedPerfil}
      />
    </BasePages>
  );
}

export default page;
