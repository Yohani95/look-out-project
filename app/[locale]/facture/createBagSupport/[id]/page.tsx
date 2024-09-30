import React from 'react';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import FactureCreate from '@/app/[locale]/components/facture/FactureCreate';
import {
  GetAllEntitiesByIdSoporte,
  getFacturaPeriodoByIdHoras,
} from '@/app/api/actions/factura/FacturaPeriodoActions';
import FacturaPeriodo from '@/app/api/models/factura/FacturaPeriodo';
import HorasUtilizadas from '@/app/api/models/support/HorasUtilizadas';
import { GetAllEntitiesById } from '@/app/api/actions/soporte/SoporteActions';
import Soporte from '@/app/api/models/support/Soporte';
import { GetAllFacturaAdaptacionEntitiesByIdHoras } from '@/app/api/actions/factura/FacturaAdaptacionActions';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  //facturasPeriodo
  let data = new HorasUtilizadas();
  const soporte = (await GetAllEntitiesById(params.id)) as Soporte;
  const facturas = (await GetAllEntitiesByIdSoporte(
    params.id
  )) as FacturaPeriodo[];
  const facturaAdapcion = await GetAllFacturaAdaptacionEntitiesByIdHoras(
    params.id
  ); //
  data.proyecto = soporte;
  data.id = null;
  data.fechaPeriodoDesde = soporte.pryFechaInicioEstimada;
  data.fechaPeriodoHasta = soporte.pryFechaCierreEstimada;
  data.monto = soporte.pryValor;
  return (
    <>
      <BasePages title={t.Nav.facture.requestBilling}>
        <FactureCreate
          t={t}
          periodo={data}
          facturas={facturas}
          facturaAdaptacionData={facturaAdapcion}
        />
      </BasePages>
    </>
  );
}

export default page;
