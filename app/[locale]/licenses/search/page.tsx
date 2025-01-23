import React from 'react';
import VentaLicenciaSearch from '../../components/licencia/VentaLicenciaSearch';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getAllVentaLicencia } from '@/app/actions/licencia/VentaLicenciaActions';
import { getAllEstadoVentaLicencia } from '@/app/actions/licencia/EstadoLicenciaVentaActions';
async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await getAllVentaLicencia();
  const listaEstados = await getAllEstadoVentaLicencia();
  return (
    <BasePages title={t.Common.licenses}>
      <VentaLicenciaSearch t={t} data={data} listaestados={listaEstados} />
    </BasePages>
  );
}

export default page;
