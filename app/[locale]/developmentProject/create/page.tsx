import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import ProyectoDesarrolloCreate from '../../components/proyectoDesarrollo/ProyectoDesarrolloCreate';
import { fetchMoneda } from '@/app/[locale]/utils/country/moneda/UtilsMoneda';
import fetchCountriest from '@/app/[locale]/utils/country/Countrylist';
import { fechtClients } from '@/app/[locale]/utils/client/ClientFormLogic';
import { getAllEstadoProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/EstadoProyectoDesarrolloActions';
import { getAllEtapaProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/EtapaProyectoDesarrolloActions';
import { getAllTipoProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/TipoProyectoDesarrolloActions';
import EstadoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/EstadoProyectoDesarrollo';
import EtapaProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/EtapaProyectoDesarrollo';
import TipoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/TipoProyectoDesarrollo';
import { getAllEmpresaPrestadora } from '@/app/api/actions/proyecto/EmpresaPrestadoraActions';
import EmpresaPrestadora from '@/app/api/models/proyecto/EmpresaPrestadora';

async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  return (
    <BasePages title={t.Common.project}>
      <ProyectoDesarrolloCreate data={data} t={t} />
    </BasePages>
  );
}

const GetData = async () => {
  try {
    const [
      monedas,
      paises,
      clientes,
      estadosProyecto,
      etapasProyecto,
      tiposProyecto,
      empresaPrestadora,
    ] = await Promise.all([
      fetchMoneda(),
      fetchCountriest(),
      fechtClients(),
      getAllEstadoProyectoDesarrollo(),
      getAllEtapaProyectoDesarrollo(),
      getAllTipoProyectoDesarrollo(),
      getAllEmpresaPrestadora(),
    ]);

    const mappedMonedas = monedas.map((moneda) => ({
      value: moneda.monId,
      label: moneda.monNombre,
    }));

    const mappedPaises = paises.map((country) => ({
      value: country.paiId,
      label: country.paiNombre,
    }));

    const mappedClientes = clientes.map((item) => ({
      value: item.cliId,
      label: item.cliNombre,
    }));

    const mappedEstadosProyecto = estadosProyecto.map((estado) => {
      return new EstadoProyectoDesarrollo(estado).getSelectOptions();
    });

    const mappedEtapasProyecto = etapasProyecto.map((etapa) => {
      return new EtapaProyectoDesarrollo(etapa).getSelectOptions();
    });

    const mappedTiposProyecto = tiposProyecto.map((tipo) => {
      return new TipoProyectoDesarrollo(tipo).getSelectOptions();
    });
    const mappedEmpresaEmprestadora = empresaPrestadora.map((empresa) => {
      return new EmpresaPrestadora(empresa).getSelectOptions();
    });
    return {
      monedas: mappedMonedas,
      paises: mappedPaises,
      clientes: mappedClientes,
      estadosProyecto: mappedEstadosProyecto,
      etapasProyecto: mappedEtapasProyecto,
      tiposProyecto: mappedTiposProyecto,
      empresaPrestadora: mappedEmpresaEmprestadora,
    };
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

export default page;
