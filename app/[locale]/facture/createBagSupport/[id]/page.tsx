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

  // Obtiene soporte
  const soporte = (await GetAllEntitiesById(params.id)) as Soporte;

  // Verifica si el objeto soporte tiene datos complejos
  const plainSoporte =
    typeof soporte === 'object' && soporte.constructor.name !== 'Object'
      ? JSON.parse(JSON.stringify(soporte))
      : soporte;

  // Obtiene facturas y facturaAdapcion
  const facturas = (await GetAllEntitiesByIdSoporte(
    params.id
  )) as FacturaPeriodo[];
  const facturaAdapcion = await GetAllFacturaAdaptacionEntitiesByIdHoras(
    params.id
  );

  // Inicializa HorasUtilizadas con los datos de soporte
  let data = new HorasUtilizadas();
  data.proyecto = plainSoporte;
  data.id = null;
  data.fechaPeriodoDesde = plainSoporte.pryFechaInicioEstimada;
  data.fechaPeriodoHasta = plainSoporte.pryFechaCierreEstimada;
  data.monto = plainSoporte.pryValor;

  // Asegúrate de que horasUtilizadas también sea un objeto serializable
  const plainHorasUtilizadas = JSON.parse(JSON.stringify(data));

  return (
    <>
      <BasePages title={t.Nav.facture.requestBilling}>
        <FactureCreate
          t={t}
          periodo={plainHorasUtilizadas}
          facturas={facturas}
          facturaAdaptacionData={facturaAdapcion}
        />
      </BasePages>
    </>
  );
}

export default page;
