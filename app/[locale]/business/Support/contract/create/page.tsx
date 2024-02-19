import React from 'react'
import BasePages from "@/app/[locale]/components/common/BasePages";
import { useLocale } from 'next-intl';
import Contractcreate from '@/app/[locale]/components/support/contract/Contractcreate';
import { GetData } from "@/app/[locale]/utils/business/UtilsService";
import TipoFacturacion from "@/app/api/models/factura/TipoFacturacion";
import { getAllTipoFacturacion } from '@/app/api/actions/factura/TipoFacturacionActions';
async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const tiposFacturas = await getAllTipoFacturacion() as TipoFacturacion[];
  const data = await GetData();
  data.tiposFacturas = tiposFacturas.map((tipoFactura) => { return new TipoFacturacion(tipoFactura).getSelectOptions() });
  return (
    <BasePages title={t.Common.supports}>
      <Contractcreate t={t} data={data} />
    </BasePages>
  )
}

export default page