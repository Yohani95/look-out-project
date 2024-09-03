import React from 'react';
import { useLocale } from 'next-intl';
import BasePages from '@/app/[locale]/components/common/BasePages';
import ProspectoCreate from '../../components/prospecto/ProspectoCreate';
import { getAllEstadoProspecto } from '@/app/actions/prospecto/EstadoProspectoActions';
import EstadoProspecto from '@/app/api/models/prospecto/EstadoProspecto';
import { fechtClients } from '@/app/[locale]/utils/client/ClientFormLogic';
import { getAllByIdTipoPersona } from '@/app/actions/admin/PersonaActions';
import { Constantes } from '@/app/api/models/common/Constantes';
import Persona from '@/app/api/models/admin/Persona';
import { getAllContactoProspecto } from '@/app/actions/prospecto/ContactoProspectoActions';
import ContactosProspecto from '@/app/api/models/prospecto/ContactoProspecto';
async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  return (
    <BasePages title={t.Common.prospect}>
      <ProspectoCreate t={t} data={data} />
    </BasePages>
  );
}
const GetData = async () => {
  const [estados, clientes, contactos] = await Promise.all([
    getAllEstadoProspecto(),
    fechtClients(),
    getAllContactoProspecto(),
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
    return {
      estados: mappedEstados,
      clientes: mappedClientes,
      contactos: mappedContactos,
    };
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default page;
