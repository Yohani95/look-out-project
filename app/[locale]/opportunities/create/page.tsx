import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import OportunidadCreate from '../../components/oportunidad/OportunidadCreate';
import { fetchMoneda } from '@/app/[locale]/utils/country/moneda/UtilsMoneda';
import fetchCountriest from '@/app/[locale]/utils/country/Countrylist';
import { fechtClients } from '@/app/[locale]/utils/client/ClientFormLogic';
import { getAllEmpresaPrestadora } from '@/app/api/actions/proyecto/EmpresaPrestadoraActions';
import EmpresaPrestadora from '@/app/api/models/proyecto/EmpresaPrestadora';
import { getAllTipoOportunidad } from '@/app/actions/Oportunidad/TipoOportunidadActions';
import TipoOportunidad from '@/app/api/models/oportunidad/TipoOportunidad';
import { getAllEstadoOportunidad } from '@/app/actions/Oportunidad/EstadoOportunidad';
import EstadoOportunidad from '@/app/api/models/oportunidad/EstadoOportunidad';
import { getAllAreaServicioOportunidad } from '@/app/actions/Oportunidad/AreaServicioOportunidadActions';
import AreaServicioOportunidad from '@/app/api/models/oportunidad/AreaServicioOportunidad';
import { getAllLicitacionOportunidad } from '@/app/actions/Oportunidad/LicitacionOportunidadActions';
import { getAllTipoLicenciaOportunidad } from '@/app/actions/Oportunidad/TipoLicenciaOportunidadActions';
import { getAllOrigenOportunidad } from '@/app/actions/Oportunidad/OrigenOportunidadActions';
import LicitacionOportunidad from '@/app/api/models/oportunidad/LicitacionOportunidad';
import TipoLicenciaOportunidad from '@/app/api/models/oportunidad/TipoLicenciaOportunidad';
import OrigenOportunidad from '@/app/api/models/oportunidad/OrigenOportunidad';
import { getAllTipoCerradaOportunidad } from '@/app/actions/Oportunidad/TipoCerradaOportunidadActions';
import TipoCerradaOportunidad from '@/app/api/models/oportunidad/TipoCerradaOportunidad';
async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  return (
    <BasePages title={t.Opportunity.opportunity}>
      <OportunidadCreate data={data} t={t} />
    </BasePages>
  );
}
const GetData = async () => {
  try {
    const [
      monedas,
      paises,
      clientes,
      empresaPrestadora,
      tipoOportunidad,
      estadoOportunidad,
      areaServicioOportunidad,
      licitacionOportunidad,
      tipoLicenciaOportunidad,
      origenOportunidad,
      tipoCerrada,
    ] = await Promise.all([
      fetchMoneda(),
      fetchCountriest(),
      fechtClients(),
      getAllEmpresaPrestadora(),
      getAllTipoOportunidad(),
      getAllEstadoOportunidad(),
      getAllAreaServicioOportunidad(),
      getAllLicitacionOportunidad(),
      getAllTipoLicenciaOportunidad(),
      getAllOrigenOportunidad(),
      getAllTipoCerradaOportunidad(),
    ]);

    const mappedMonedas = monedas.map((moneda) => ({
      value: moneda.monId,
      label: moneda.monNombre,
    }));

    const mappedPaises = paises.map((country) => ({
      value: country.paiId,
      label: country.paiNombre,
    }));

    const mappedclientes = clientes.map((item) => ({
      value: item.cliId,
      label: item.cliNombre,
    }));
    const mappedEmpresaEmprestadora = empresaPrestadora.map((empresa) => {
      return new EmpresaPrestadora(empresa).getSelectOptions();
    });
    const mappedtipoOportunidad = tipoOportunidad.map((tipo) => {
      return new TipoOportunidad(tipo).getSelectOptions();
    });
    const mappedEstadoOportunidad = estadoOportunidad.map((tipo) => {
      return new EstadoOportunidad(tipo).getSelectOptions();
    });
    const mappedareaOportunidad = areaServicioOportunidad.map((area) => {
      return new AreaServicioOportunidad(area).getSelectOptions();
    });
    const mappedLicitacion = licitacionOportunidad.map((licitacion) => {
      return new LicitacionOportunidad(licitacion).getSelectOptions();
    });
    const mappedTipoLicencia = tipoLicenciaOportunidad.map((tipo) => {
      return new TipoLicenciaOportunidad(tipo).getSelectOptions();
    });
    const mappedOrigen = origenOportunidad.map((origen) => {
      return new OrigenOportunidad(origen).getSelectOptions();
    });
    const mappedTipoCerrada = tipoCerrada.map((tipo) => {
      return new TipoCerradaOportunidad(tipo).getSelectOptions();
    });
    return {
      monedas: mappedMonedas,
      paises: mappedPaises,
      clientes: mappedclientes,
      empresaPrestadora: mappedEmpresaEmprestadora,
      tipoOportunidad: mappedtipoOportunidad,
      estadoOportunidad: mappedEstadoOportunidad,
      areaServicio: mappedareaOportunidad,
      licitacionOportunidad: mappedLicitacion,
      tipoLicencia: mappedTipoLicencia,
      origenOportunidad: mappedOrigen,
      tipoCerrada: mappedTipoCerrada,
    };
  } catch (error) {
    // Manejo de errores si alguna de las operaciones falla
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};
export default page;
