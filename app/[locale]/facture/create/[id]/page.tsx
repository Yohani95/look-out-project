import React from "react";
import { useLocale} from "next-intl";
import BasePages from "@/app/[locale]/components/common/BasePages";
import FactureCreate from "@/app/[locale]/components/facture/FactureCreate";
import { getPeriodoProyecto } from "@/app/api/actions/proyecto/PeriodoActions";
import { getFacturaPeriodoByIdPeriodo, getAllFacturaPeriodo} from "@/app/api/actions/factura/FacturaPeriodoActions";
import FacturaPeriodo from "@/app/api/models/factura/FacturaPeriodo";
import PeriodosProyecto from "@/app/api/models/proyecto/PeriodosProyecto";
async function page({params}) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  //periodoProyecto
  const periodo = await getPeriodoProyecto(params.id) as PeriodosProyecto;
  //facturasPeriodo
  const facturas=await getFacturaPeriodoByIdPeriodo(periodo.id) as FacturaPeriodo[];
  console.log(facturas)
  return (
    <>
      <BasePages title={t.Nav.facture.requestBilling} >
        <FactureCreate t={t} periodo={periodo} facturas={facturas} />
      </BasePages>
    </>
  );
}

export default page;
