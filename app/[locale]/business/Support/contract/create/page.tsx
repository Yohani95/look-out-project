import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import Contractcreate from '@/app/[locale]/components/support/contract/Contractcreate';
import { GetData } from '@/app/[locale]/utils/business/UtilsService';
import TipoFacturacion from '@/app/api/models/factura/TipoFacturacion';
import { getAllTipoFacturacion } from '@/app/api/actions/factura/TipoFacturacionActions';
import { getAllDiaPagos } from '@/app/api/actions/factura/DiaPagosActions';
import { getAllEmpresaPrestadora } from '@/app/api/actions/proyecto/EmpresaPrestadoraActions';
import DiaPagos from '@/app/api/models/factura/DiaPagos';
import EmpresaPrestadora from '@/app/api/models/proyecto/EmpresaPrestadora';
async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const tiposFacturas = (await getAllTipoFacturacion()) as TipoFacturacion[];
  const data = await GetData();
  const diaPagos = (await getAllDiaPagos()) as DiaPagos[];
  const empresaPrestadora =
    (await getAllEmpresaPrestadora()) as EmpresaPrestadora[];
  data.tiposFacturas = tiposFacturas.map((tipoFactura) => {
    return new TipoFacturacion(tipoFactura).getSelectOptions();
  });
  data.diaPagos = diaPagos.map((diaPagos) => {
    return new DiaPagos(diaPagos).getSelectOptions();
  });
  data.empresaPrestadora = empresaPrestadora.map((empresa) => {
    return new EmpresaPrestadora(empresa).getSelectOptions();
  });
  return (
    <BasePages title={t.Common.supports}>
      <Contractcreate t={t} data={data} />
    </BasePages>
  );
}

export default page;
