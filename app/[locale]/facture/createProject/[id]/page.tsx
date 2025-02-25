import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import FactureCreate from '@/app/[locale]/components/facture/FactureCreate';
import { getLocale } from 'next-intl/server';
import PeriodoGenerico from '@/app/api/models/factura/PeriodoGenerico';
import { GetAllEntitiesFacturaByIdProyectoDesarrollo } from '@/app/api/actions/factura/FacturaPeriodoActions';
import { GetAllFacturaAdaptacionEntitiesByIdProyectoDesarrollo } from '@/app/api/actions/factura/FacturaAdaptacionActions';
import HitoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/HitoProyectoDesarrollo';
import { getHitoProyectoDesarrolloById } from '@/app/actions/proyectoDesarrollo/HitoProyectoDesarrolloActions';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id);
  const hito = data.hito as HitoProyectoDesarrollo;
  const periodoData: PeriodoGenerico = {
    id: hito.id || null,
    pryId: hito.proyectoDesarrollo.id || null,
    fechaPeriodoDesde: hito.proyectoDesarrollo.fechaCreacion,
    fechaPeriodoHasta: hito.proyectoDesarrollo.fechaCierre,
    monto: hito.monto,
    proyecto: {
      pryId: hito.id || null,
      idTipoFacturacion: null,
      pryNombre: hito.proyectoDesarrollo.nombre || null,
      cliente: hito.proyectoDesarrollo.cliente || null,
    },
  };
  return (
    <>
      <BasePages title={t.Nav.facture.requestBilling}>
        <FactureCreate
          t={t}
          facturas={data.facturas}
          periodo={periodoData}
          facturaAdaptacionData={data.facturaAdaptacion}
        />
      </BasePages>
    </>
  );
}
const GetData = async (id: number) => {
  const [facturas, hito, facturaAdaptacion] = await Promise.all([
    GetAllEntitiesFacturaByIdProyectoDesarrollo(id),
    getHitoProyectoDesarrolloById(id),
    GetAllFacturaAdaptacionEntitiesByIdProyectoDesarrollo(id),
  ]);
  return {
    facturas,
    hito,
    facturaAdaptacion,
  };
};
export default page;
