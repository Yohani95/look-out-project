import React from "react";
import { useLocale} from "next-intl";
import BasePages from "@/app/[locale]/components/common/BasePages";
import FacturasSolicitadasSearch from "../../components/facture/FacturasSolicitadas/FacturasSolicitadasSearch";
import FacturaPeriodo from "@/app/api/models/factura/FacturaPeriodo";
import {getAllPreSolicitadaFacturaPeriodo } from "@/app/api/actions/factura/FacturaPeriodoActions";
async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const facturas= await getAllPreSolicitadaFacturaPeriodo() as FacturaPeriodo[];
  return (
      <BasePages title={t.Nav.facture.billing}>
        <FacturasSolicitadasSearch t={t} facturas={facturas}/>
      </BasePages>
  );
}

export default page;
