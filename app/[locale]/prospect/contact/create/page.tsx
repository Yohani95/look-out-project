import React from 'react';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import ContactoPropsectoCreate from '@/app/[locale]/components/prospecto/ProspectoContacto/ContactoPropsectoCreate';
import { getAllTipoContactoProspecto } from '@/app/actions/prospecto/TipoContactoProspecto';
import TipoContactoProspecto from '@/app/api/models/prospecto/TipoContactoProspecto';
import fetchCountriest from '@/app/[locale]/utils/country/Countrylist';
import { getAllPerfil } from '@/app/actions/admin/PerfilActions';
import Perfil from '@/app/api/models/admin/Perfil';
async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  return (
    <BasePages title={t.Common.prospectContact}>
      <ContactoPropsectoCreate t={t} data={data} />
    </BasePages>
  );
}
const GetData = async () => {
  const [tipos, paises, perfiles] = await Promise.all([
    getAllTipoContactoProspecto(),
    fetchCountriest(),
    getAllPerfil(),
  ]);
  try {
    const mappedTipos = tipos.map((tipo) => {
      return new TipoContactoProspecto(tipo).getSelectOptions();
    });
    const mappedPaises = paises.map((country) => ({
      value: country.paiId,
      label: country.paiNombre,
    }));
    const mappedPerfiles = perfiles.map((perfil) => {
      return new Perfil(perfil).getSelectOptions();
    });
    return {
      tipos: mappedTipos,
      paises: mappedPaises,
      perfiles: mappedPerfiles,
    };
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default page;
