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
import ProyectoDesarrolloEdit from '@/app/[locale]/components/proyectoDesarrollo/ProyectoDesarrolloEdit';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getAllEmpresaPrestadora } from '@/app/api/actions/proyecto/EmpresaPrestadoraActions';
import EmpresaPrestadora from '@/app/api/models/proyecto/EmpresaPrestadora';
import fetchCountries from '@/app/[locale]/utils/country/Countrylist';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id);
  return <ProyectoDesarrolloEdit data={data} t={t} id={params.id} />;
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
      empresaPrestadora,
      paises,
      profesionales,
    ] = await Promise.all([
      fetchMoneda(),
      fechtClients(),
      getAllEstadoProyectoDesarrollo(),
      getAllEtapaProyectoDesarrollo(),
      getAllTipoProyectoDesarrollo(),
      getProyectoDesarrolloById(id),
      getAllByIdTipoPersona(Constantes.TipoPersona.PERSONA_KAM),
      getAllEmpresaPrestadora(),
      fetchCountries(),
      getAllByIdTipoPersona(Constantes.TipoPersona.PERSONA_PROFESIONAL),
    ]);

    // Mapeo de datos para opciones de selección
    const mappedPaises = paises.map((country) => ({
      value: country.paiId,
      label: country.paiNombre,
    }));

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
    const mappedEmpresaEmprestadora = empresaPrestadora.map((empresa) => {
      return new EmpresaPrestadora(empresa).getSelectOptions();
    });
    const mappedProfesionales = profesionales.map((profesional) => {
      return new Persona(profesional).getSelectOptions();
    });
    return {
      paises: mappedPaises,
      monedas: mappedMonedas,
      clientes: mappedClientes,
      estadosProyecto: mappedEstadosProyecto,
      etapasProyecto: mappedEtapasProyecto,
      tiposProyecto: mappedTiposProyecto,
      proyectoDesarrollo,
      personasKam: mappedPersonaKam,
      empresaPrestadora: mappedEmpresaEmprestadora,
      profesionales: mappedProfesionales,
    };
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

export default page;
