import React from 'react';
import { useLocale } from 'next-intl';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getAllEstadoProspecto } from '@/app/actions/prospecto/EstadoProspectoActions';
import EstadoProspecto from '@/app/api/models/prospecto/EstadoProspecto';
import { getAllByIdTipoPersona } from '@/app/actions/admin/PersonaActions';
import { Constantes } from '@/app/api/models/common/Constantes';
import Persona from '@/app/api/models/admin/Persona';
import { fechtClients } from '@/app/[locale]/utils/client/ClientFormLogic';
import { getProspectoById } from '@/app/actions/prospecto/ProspectoActions';
import ContactosProspecto from '@/app/api/models/prospecto/ContactoProspecto';
import { getAllContactoProspecto } from '@/app/actions/prospecto/ContactoProspectoActions';
import { getAllReunionProspecto } from '@/app/actions/prospecto/ReunionProspectoActions';
import ProspectoReunion from '@/app/[locale]/components/prospecto/ProspectoReunion';
async function page({ params }) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id);
  return (
    <BasePages title={t.Opportunity.opportunities}>
      <ProspectoReunion data={data} t={t} id={params.id} />
    </BasePages>
  );
}
const GetData = async (id) => {
  try {
    const [estados, kam, prospecto, clientes, reuniones, contactos] =
      await Promise.all([
        getAllEstadoProspecto(),
        getAllByIdTipoPersona(Constantes.TipoPersona.PERSONA_KAM),
        getProspectoById(id),
        fechtClients(),
        getAllReunionProspecto(),
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

    const reunionesProspecto = reuniones.filter(
      (llamada) => llamada.idProspecto === parseInt(id)
    );
    const mappedContactos = contactos.map((contacto) => {
      return new ContactosProspecto(contacto).getSelectOptions();
    });
    return {
      estados: mappedEstados,
      clientes: mappedClientes,
      personasKam: mappedKAM,
      prospecto,
      contactos: mappedContactos,
      reuniones: reunionesProspecto,
    };
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default page;
