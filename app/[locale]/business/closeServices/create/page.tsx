import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { GetData } from '@/app/[locale]/utils/business/UtilsService';
import ServiceCreate from '../../../components/business/Services/ServiceCreate';
import { getAllTipoFacturacion } from '@/app/api/actions/factura/TipoFacturacionActions';
import TipoFacturacion from '@/app/api/models/factura/TipoFacturacion';
import { getAllDiaPagos } from '@/app/api/actions/factura/DiaPagosActions';
import DiaPagos from '@/app/api/models/factura/DiaPagos';
import { getAllEmpresaPrestadora } from '@/app/api/actions/proyecto/EmpresaPrestadoraActions';
import EmpresaPrestadora from '@/app/api/models/proyecto/EmpresaPrestadora';
async function page() {
  const locale = useLocale();
  const tiposFacturas = (await getAllTipoFacturacion()) as TipoFacturacion[];
  const diaPagos = (await getAllDiaPagos()) as DiaPagos[];
  const empresaPrestadora =
    (await getAllEmpresaPrestadora()) as EmpresaPrestadora[];
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
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
    <BasePages title={t.Nav.business.insertServices}>
      <ServiceCreate locale={locale} data={data} t={t} />
    </BasePages>
  );
}

export default page;
