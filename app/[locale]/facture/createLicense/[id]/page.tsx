import FactureCreate from '@/app/[locale]/components/facture/FactureCreate';
import { GetAllEntitiesByIdLicense } from '@/app/api/actions/factura/FacturaPeriodoActions';
import { getLocale } from 'next-intl/server';
import React from 'react';
import PeriodoGenerico from '@/app/api/models/factura/PeriodoGenerico';
import TarifarioVentaLicencia from '@/app/api/models/licencia/TarifarioVentaLicencia';
import { getVentaLicenciaById } from '@/app/actions/licencia/VentaLicenciaActions';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getAllTarifarioVentaLicenciaByIdLicencia } from '@/app/actions/licencia/TarifarioVentaLicencia';
import { GetAllFacturaAdaptacionEntitiesByIdLicense } from '@/app/api/actions/factura/FacturaAdaptacionActions';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params);
  const licencia = data.licencia;
  const tarifarioLicencias = (await getAllTarifarioVentaLicenciaByIdLicencia(
    licencia.id
  )) as TarifarioVentaLicencia[];
  const tarifaTotal = tarifarioLicencias
    ? tarifarioLicencias.reduce((total, t) => total + (t.valor || 0), 0)
    : null;
  const periodoData: PeriodoGenerico = {
    id: licencia.id || null,
    pryId: licencia.id || null,
    fechaPeriodoDesde: licencia.fechaCreacion
      ? new Date(licencia.fechaCreacion)
      : null,
    fechaPeriodoHasta: licencia.fechaCierre
      ? new Date(licencia.fechaCierre)
      : null,
    monto: tarifaTotal,
    proyecto: {
      pryId: licencia.id || null,
      idTipoFacturacion: licencia.idTipoFacturacion || null,
      pryNombre: licencia.nombre || null,
      cliente: licencia.cliente || null, // Asegúrate de que `cliente` sea del tipo `Cliente` o `null`
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

const GetData = async (params) => {
  const [facturas, licencia, tarifarioLicencias, facturaAdaptacion] =
    await Promise.all([
      GetAllEntitiesByIdLicense(params.id),
      getVentaLicenciaById(params.id),
      getAllTarifarioVentaLicenciaByIdLicencia(params.id),
      GetAllFacturaAdaptacionEntitiesByIdLicense(params.id),
    ]);
  return {
    facturas,
    licencia,
    tarifarioLicencias,
    facturaAdaptacion,
  };
};

export default page;
