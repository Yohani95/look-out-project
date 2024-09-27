import React from 'react';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getAllEstadoProspecto } from '@/app/actions/prospecto/EstadoProspectoActions';
import EstadoProspecto from '@/app/api/models/prospecto/EstadoProspecto';
import { getAllByIdTipoPersona } from '@/app/actions/admin/PersonaActions';
import { Constantes } from '@/app/api/models/common/Constantes';
import Persona from '@/app/api/models/admin/Persona';
import ProspectoEdit from '@/app/[locale]/components/prospecto/ProspectoEdit';
import { fechtClients } from '@/app/[locale]/utils/client/ClientFormLogic';
import { getProspectoById } from '@/app/actions/prospecto/ProspectoActions';
import { getAllContactoProspecto } from '@/app/actions/prospecto/ContactoProspectoActions';
import ContactosProspecto from '@/app/api/models/prospecto/ContactoProspecto';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id);
  return (
    <BasePages title={t.Opportunity.opportunities}>
      <ProspectoEdit data={data} t={t} id={params.id} />
    </BasePages>
  );
}
const GetData = async (id) => {
  try {
    const [estados, kam, prospecto, clientes, contactos] = await Promise.all([
      getAllEstadoProspecto(),
      getAllByIdTipoPersona(Constantes.TipoPersona.PERSONA_KAM),
      getProspectoById(id),
      fechtClients(),
      getAllContactoProspecto(),
    ]);
    const mappedClientes = clientes.map((item) => ({
      value: item.cliId,
      label: item.cliNombre,
    }));
    const mappedEstados = estados.map((estado) => {
      return new EstadoProspecto(estado).getSelectOptions();
    });
    const mappedKAM = kam.map((kam) => {
      return new Persona(kam).getSelectOptions();
    });
    const mappedContactos = contactos.map((contacto) => {
      return new ContactosProspecto(contacto).getSelectOptions();
    });
    return {
      estados: mappedEstados,
      clientes: mappedClientes,
      personasKam: mappedKAM,
      contactos: mappedContactos,
      prospecto,
    };
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default page;
