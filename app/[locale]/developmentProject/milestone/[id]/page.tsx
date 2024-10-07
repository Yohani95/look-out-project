import React from 'react';
import { getLocale } from 'next-intl/server';

import { getProyectoDesarrolloById } from '@/app/actions/proyectoDesarrollo/ProyectoDesarrolloActions';
import { fetchMoneda } from '@/app/[locale]/utils/country/moneda/UtilsMoneda';
import { fechtClients } from '@/app/[locale]/utils/client/ClientFormLogic';
import { getAllEstadoProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/EstadoProyectoDesarrolloActions';
import { getAllEtapaProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/EtapaProyectoDesarrolloActions';
import { getAllTipoProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/TipoProyectoDesarrolloActions';
import { getAllByIdTipoPersona } from '@/app/actions/admin/PersonaActions';
import { Constantes } from '@/app/api/models/common/Constantes';
import Persona from '@/app/api/models/admin/Persona';
import BasePages from '@/app/[locale]/components/common/BasePages';
import ProyectoDesarrolloMilestone from '@/app/[locale]/components/proyectoDesarrollo/ProyectoDesarrolloMilestone';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id);
  return (
    <BasePages title={t.Common.project}>
      <ProyectoDesarrolloMilestone data={data} t={t} id={params.id} />
    </BasePages>
  );
}

const GetData = async (id: number) => {
  try {
    const [
      monedas,
      clientes,
      estadosProyecto,
      etapasProyecto,
      tiposProyecto,
      proyectoDesarrollo,
      personasKam,
    ] = await Promise.all([
      fetchMoneda(),
      fechtClients(),
      getAllEstadoProyectoDesarrollo(),
      getAllEtapaProyectoDesarrollo(),
      getAllTipoProyectoDesarrollo(),
      getProyectoDesarrolloById(id),
      getAllByIdTipoPersona(Constantes.TipoPersona.PERSONA_KAM),
    ]);

    // Mapeo de datos para opciones de selección
    const mappedMonedas = monedas.map((moneda) => ({
      value: moneda.monId,
      label: moneda.monNombre,
    }));

    const mappedClientes = clientes.map((item) => ({
      value: item.cliId,
      label: item.cliNombre,
    }));

    const mappedEstadosProyecto = estadosProyecto.map((estado) => ({
      value: estado.id,
      label: estado.nombre,
    }));
    const mappedEtapasProyecto = etapasProyecto.map((etapa) => ({
      value: etapa.id,
      label: etapa.nombre,
    }));

    const mappedTiposProyecto = tiposProyecto.map((tipo) => ({
      value: tipo.id,
      label: tipo.nombre,
    }));

    const mappedPersonaKam = personasKam.map((kam) => {
      return new Persona(kam).getSelectOptions();
    });
    return {
      monedas: mappedMonedas,
      clientes: mappedClientes,
      estadosProyecto: mappedEstadosProyecto,
      etapasProyecto: mappedEtapasProyecto,
      tiposProyecto: mappedTiposProyecto,
      proyectoDesarrollo,
      personasKam: mappedPersonaKam,
    };
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

export default page;
