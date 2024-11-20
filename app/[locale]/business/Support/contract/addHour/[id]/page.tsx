import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import { GetData } from '@/app/[locale]/utils/business/UtilsService';
import TipoFacturacion from '@/app/api/models/factura/TipoFacturacion';
import { getAllTipoFacturacion } from '@/app/api/actions/factura/TipoFacturacionActions';
import { getAllDiaPagos } from '@/app/api/actions/factura/DiaPagosActions';
import { getAllEmpresaPrestadora } from '@/app/api/actions/proyecto/EmpresaPrestadoraActions';
import DiaPagos from '@/app/api/models/factura/DiaPagos';
import EmpresaPrestadora from '@/app/api/models/proyecto/EmpresaPrestadora';
import Soporte from '@/app/api/models/support/Soporte';
import {
  GetAllEntitiesById,
  getsoporteById,
} from '@/app/api/actions/soporte/SoporteActions';
import ContractHorasUtilizadas from '@/app/[locale]/components/support/contract/ContractHorasUtilizadas';
import { getAllHorasByIdSoporte } from '@/app/api/actions/soporte/HorasUtilizadasActions';
import HorasUtilizadas from '@/app/api/models/support/HorasUtilizadas';
import { getAllByIdTipoPersona } from '@/app/actions/admin/PersonaActions';
import { Constantes } from '@/app/api/models/common/Constantes';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const tiposFacturas = await getAllTipoFacturacion();
  const data = await GetData();
  const diaPagos = await getAllDiaPagos();
  const empresaPrestadora = await getAllEmpresaPrestadora();
  data.tiposFacturas = tiposFacturas.map((tipoFactura) => {
    return new TipoFacturacion(tipoFactura).getSelectOptions();
  });
  data.diaPagos = diaPagos.map((diaPagos) => {
    return new DiaPagos(diaPagos).getSelectOptions();
  });
  data.empresaPrestadora = empresaPrestadora.map((empresa) => {
    return new EmpresaPrestadora(empresa).getSelectOptions();
  });
  // Asumiendo que GetAllEntitiesById retorna una sola entidad
  const soporteData = await GetAllEntitiesById(params.id);
  data.soporte = soporteData ? { ...soporteData } : null;

  // Asegurar que horasUtilizadas sean objetos planos
  const horasUtilizadasData = await getAllHorasByIdSoporte(params.id);
  data.horasUtilizadas = horasUtilizadasData.map((hora) => ({
    ...hora,
  }));
  return (
    <BasePages title={t.Common.supports}>
      <ContractHorasUtilizadas t={t} data={data} />
    </BasePages>
  );
}

export default page;
