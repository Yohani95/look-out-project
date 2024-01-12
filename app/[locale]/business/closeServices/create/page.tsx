import React from "react";
import { useTranslations, useLocale } from "next-intl";
import FormService from "@/app/[locale]/components/business/Services/FormService";
import BasePages from "@/app/[locale]/components/common/BasePages";
import { GetData } from "@/app/[locale]/utils/business/UtilsService";
import ServiceCreate from "../../../components/business/Services/ServiceCreate";
import { tipoFacturacionCrud  } from "@/app/api/actions/factura/TipoFacturacionActions";
import TipoFacturacion from "@/app/api/models/factura/TipoFacturacion";
async function page() {
  const locale = useLocale();
  const tiposFacturas=await tipoFacturacionCrud.getAll() as TipoFacturacion[];
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  data.tiposFacturas=tiposFacturas.map((tipoFactura)=>{return new TipoFacturacion(tipoFactura).getSelectOptions()}); 
  return (
    <BasePages title={t.Nav.business.insertServices}>
      <ServiceCreate locale={locale} data={data} t={t}/>
    </BasePages>
  );
}

export default page;
