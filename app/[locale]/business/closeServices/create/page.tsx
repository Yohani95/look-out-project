import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { GetData } from '@/app/[locale]/utils/business/UtilsService';
import { getAllTipoFacturacion } from '@/app/api/actions/factura/TipoFacturacionActions';
import TipoFacturacion from '@/app/api/models/factura/TipoFacturacion';
import { getAllDiaPagos } from '@/app/api/actions/factura/DiaPagosActions';
import DiaPagos from '@/app/api/models/factura/DiaPagos';
import { getAllEmpresaPrestadora } from '@/app/api/actions/proyecto/EmpresaPrestadoraActions';
import EmpresaPrestadora from '@/app/api/models/proyecto/EmpresaPrestadora';
import ServiceCreate from '@/app/[locale]/components/business/Services/ServiceCreate';
async function page() {
  const locale = await getLocale(); // Usa getLocale en Server Components
  //const t = await getTranslations(locale);        // Usa getTranslations para cargar las traducciones

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
    <BasePages
      title={`${t.Common.add} ${t.business.title}`}
      description={t.business.descriptionCreate}
    >
      <ServiceCreate data={data} t={t} />
    </BasePages>
  );
}

export default page;
