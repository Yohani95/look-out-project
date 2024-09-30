import React from 'react';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import ProspectoCreate from '../../components/prospecto/ProspectoCreate';
import { getAllEstadoProspecto } from '@/app/actions/prospecto/EstadoProspectoActions';
import EstadoProspecto from '@/app/api/models/prospecto/EstadoProspecto';
import { fechtClients } from '@/app/[locale]/utils/client/ClientFormLogic';
import { getAllContactoProspecto } from '@/app/actions/prospecto/ContactoProspectoActions';
import ContactosProspecto from '@/app/api/models/prospecto/ContactoProspecto';
import { getAllTipoContactoProspecto } from '@/app/actions/prospecto/TipoContactoProspecto';
import { getAllPerfil } from '@/app/actions/admin/PerfilActions';
import fetchCountriest from '@/app/[locale]/utils/country/Countrylist';
import Perfil from '@/app/api/models/admin/Perfil';
import TipoContactoProspecto from '@/app/api/models/prospecto/TipoContactoProspecto';
async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  return (
    <BasePages title={t.Common.prospect}>
      <ProspectoCreate t={t} data={data} />
    </BasePages>
  );
}
const GetData = async () => {
  const [estados, clientes, contactos, tipos, paises, perfiles] =
    await Promise.all([
      getAllEstadoProspecto(),
      fechtClients(),
      getAllContactoProspecto(),
      getAllTipoContactoProspecto(),
      fetchCountriest(),
      getAllPerfil(),
    ]);
  try {
    const mappedClientes = clientes.map((item) => ({
      value: item.cliId,
      label: item.cliNombre,
    }));
    const mappedEstados = estados.map((estado) => {
      return new EstadoProspecto(estado).getSelectOptions();
    });

    const mappedContactos = contactos.map((contacto) => {
      return new ContactosProspecto(contacto).getSelectOptions();
    });
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
      estados: mappedEstados,
      clientes: mappedClientes,
      contactos: mappedContactos,
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
