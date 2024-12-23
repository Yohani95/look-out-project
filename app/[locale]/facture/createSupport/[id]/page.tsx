import React from 'react';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import FactureCreate from '@/app/[locale]/components/facture/FactureCreate';
import { getFacturaPeriodoByIdHoras } from '@/app/api/actions/factura/FacturaPeriodoActions';
import FacturaPeriodo from '@/app/api/models/factura/FacturaPeriodo';
import HorasUtilizadas from '@/app/api/models/support/HorasUtilizadas';
import { gethorasUtilizadasById } from '@/app/api/actions/soporte/HorasUtilizadasActions';
import { GetAllFacturaAdaptacionEntitiesByIdSoporte } from '@/app/api/actions/factura/FacturaAdaptacionActions';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id);
  console.log(data);
  return (
    <BasePages title={t.Nav.facture.requestBilling}>
      <FactureCreate
        t={t}
        periodo={data.horas}
        facturas={data.facturas}
        facturaAdaptacionData={data.facturaAdaptacion}
      />
    </BasePages>
  );
}

const GetData = async (id) => {
  try {
    const [horasPeriodo, facturasPeriodo, facturaAdaptacion] =
      await Promise.all([
        gethorasUtilizadasById(id),
        getFacturaPeriodoByIdHoras(id),
        GetAllFacturaAdaptacionEntitiesByIdSoporte(id),
      ]);
    const horas = new HorasUtilizadas(horasPeriodo);
    const plainHorasUtilizadas = JSON.parse(JSON.stringify(horas));
    return {
      horas: plainHorasUtilizadas,
      facturas: facturasPeriodo,
      facturaAdaptacion,
    };
  } catch (error) {
    console.error(error);
    return {
      horas: null,
      facturas: [],
      facturaAdaptacion: [],
    };
  }
};

export default page;
