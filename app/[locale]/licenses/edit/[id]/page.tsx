import React from 'react';
import { fetchMoneda } from '@/app/[locale]/utils/country/moneda/UtilsMoneda';
import fetchCountriest from '@/app/[locale]/utils/country/Countrylist';
import { fechtClients } from '@/app/[locale]/utils/client/ClientFormLogic';
import { getAllEmpresaPrestadora } from '@/app/api/actions/proyecto/EmpresaPrestadoraActions';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import EmpresaPrestadora from '@/app/api/models/proyecto/EmpresaPrestadora';
import { getAllEstadoVentaLicencia } from '@/app/actions/licencia/EstadoLicenciaVentaActions';
import EstadoVentaLicencia from '@/app/api/models/licencia/EstadoVentaLicencia';
import { getAllTipoFacturacion } from '@/app/api/actions/factura/TipoFacturacionActions';
import TipoFacturacion from '@/app/api/models/factura/TipoFacturacion';
import VentaLicenciaEdit from '../../../components/licencia/VentaLicenciaEdit';
import { Constantes } from '@/app/api/models/common/Constantes';
import { getAllByIdTipoPersona } from '@/app/actions/admin/PersonaActions';
import Persona from '@/app/api/models/admin/Persona';
import { getVentaLicenciaById } from '@/app/actions/licencia/VentaLicenciaActions';
import { getAllMarcaLicencia } from '@/app/actions/licencia/MarcaLicenciaActions';
import { getAllMayoristaLicencia } from '@/app/actions/licencia/MayoristaLicencia';
import MarcaLicencia from '@/app/api/models/licencia/MarcaLicencia';
import MayoristaLicencia from '@/app/api/models/licencia/MayoristaLicencia';
import { getAllTarifarioVentaLicenciaByIdLicencia } from '@/app/actions/licencia/TarifarioVentaLicencia';
import { getAllTipoLicenciaOportunidad } from '@/app/actions/Oportunidad/TipoLicenciaOportunidadActions';
import TipoLicenciaOportunidad from '@/app/api/models/oportunidad/TipoLicenciaOportunidad';
import { getAllDiaPagos } from '@/app/api/actions/factura/DiaPagosActions';
import DiaPagos from '@/app/api/models/factura/DiaPagos';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id);
  return <VentaLicenciaEdit data={data} t={t} />;
}
const GetData = async (id: number) => {
  try {
    const [
      monedas,
      paises,
      clientes,
      empresaPrestadora,
      estadoVentaLicencia,
      tipofacturacion,
      personasKam,
      ventaLicencia,
      marca,
      mayorista,
      tarifario,
      licencias,
      diaPagos,
    ] = await Promise.all([
      fetchMoneda(),
      fetchCountriest(),
      fechtClients(),
      getAllEmpresaPrestadora(),
      getAllEstadoVentaLicencia(),
      getAllTipoFacturacion(),
      getAllByIdTipoPersona(Constantes.TipoPersona.PERSONA_KAM),
      getVentaLicenciaById(id),
      getAllMarcaLicencia(),
      getAllMayoristaLicencia(),
      getAllTarifarioVentaLicenciaByIdLicencia(id),
      getAllTipoLicenciaOportunidad(),
      getAllDiaPagos(),
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
    const mappedEstadoVentaLicencia = estadoVentaLicencia.map((tipo) => {
      return new EstadoVentaLicencia(tipo).getSelectOptions();
    });
    const mappedTipoFacturacion = tipofacturacion.map((tipoFactura) => {
      return new TipoFacturacion(tipoFactura).getSelectOptions();
    });
    const mappedPersonaKam = personasKam.map((kam) => {
      return new Persona(kam).getSelectOptions();
    });
    const mappedMarca = marca.map((marca) => {
      return new MarcaLicencia(marca).getSelectOptions();
    });
    const mappedMayorista = mayorista.map((mayorista) => {
      return new MayoristaLicencia(mayorista).getSelectOptions();
    });
    const mappedLicencias = licencias.map((licencia) => {
      return new TipoLicenciaOportunidad(licencia).getSelectOptions();
    });
    const mappedDiaPagos = diaPagos.map((diaPagos) => {
      return new DiaPagos(diaPagos).getSelectOptions();
    });
    return {
      monedas: mappedMonedas,
      paises: mappedPaises,
      clientes: mappedclientes,
      empresaPrestadora: mappedEmpresaEmprestadora,
      estadoVentaLicencia: mappedEstadoVentaLicencia,
      tipofacturacion: mappedTipoFacturacion,
      personasKam: mappedPersonaKam,
      ventaLicencia,
      marca: mappedMarca,
      mayorista: mappedMayorista,
      tarifario,
      licencias: mappedLicencias,
      diaPagos: mappedDiaPagos,
    };
  } catch (error) {
    // Manejo de errores si alguna de las operaciones falla
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};
export default page;
