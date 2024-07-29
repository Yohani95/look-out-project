import React from 'react';
import { useLocale } from 'next-intl';
import BasePages from '@/app/[locale]/components/common/BasePages';
import FactureCreate from '@/app/[locale]/components/facture/FactureCreate';
import { getFacturaPeriodoByIdHoras } from '@/app/api/actions/factura/FacturaPeriodoActions';
import FacturaPeriodo from '@/app/api/models/factura/FacturaPeriodo';
import HorasUtilizadas from '@/app/api/models/support/HorasUtilizadas';
import { gethorasUtilizadasById } from '@/app/api/actions/soporte/HorasUtilizadasActions';
import { GetAllFacturaAdaptacionEntitiesByIdSoporte } from '@/app/api/actions/factura/FacturaAdaptacionActions';
async function page({ params }) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  //periodoProyecto
  const horasPeriodo = await gethorasUtilizadasById(params.id);
  const horas = new HorasUtilizadas(horasPeriodo);
  //facturasPeriodo
  const facturas = (await getFacturaPeriodoByIdHoras(
    horasPeriodo.id
  )) as FacturaPeriodo[];
  const facturaAdaptacion = await GetAllFacturaAdaptacionEntitiesByIdSoporte(
    params.id
  );
  return (
    <>
      <BasePages title={t.Nav.facture.requestBilling}>
        <FactureCreate
          t={t}
          periodo={horas}
          facturas={facturas}
          facturaAdaptacionData={
            facturaAdaptacion.length === 0 ? null : facturaAdaptacion
          }
        />
      </BasePages>
    </>
  );
}

export default page;
