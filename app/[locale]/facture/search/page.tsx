import React from "react";
import { useLocale} from "next-intl";
import BasePages from "@/app/[locale]/components/common/BasePages";
import FacturasSolicitadasSearch from "../../components/facture/FacturasSolicitadas/FacturasSolicitadasSearch";
import FacturaPeriodo from "@/app/api/models/factura/FacturaPeriodo";
import {getAllPreSolicitadaFacturaPeriodo } from "@/app/api/actions/factura/FacturaPeriodoActions";
import { getAllMoneda } from "@/app/api/actions/world/Moneda";
import Moneda from "@/app/api/models/world/Moneda";
async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const facturas= await getAllPreSolicitadaFacturaPeriodo() as FacturaPeriodo[];
  const monedasresult=await getAllMoneda() as Moneda[];
  const monedas=monedasresult.map((moneda)=>{return new Moneda(moneda).getSelectOptions()});
  return (
      <BasePages title={t.Nav.facture.billing}>
        <FacturasSolicitadasSearch t={t} facturas={facturas} monedas={monedas}/>
      </BasePages>
  );
}

export default page;
