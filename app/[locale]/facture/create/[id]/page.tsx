import React from "react";
import { useLocale} from "next-intl";
import BasePages from "@/app/[locale]/components/common/BasePages";
import FactureCreate from "@/app/[locale]/components/facture/FactureCreate";
import { PeriodosCrud } from "@/app/api/actions/proyecto/PeriodoActions";
import { FacturaPeriodoCrud } from "@/app/api/actions/factura/FacturaPeriodoActions";
async function page({params}) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  //periodoProyecto
  const periodoActions =new PeriodosCrud();
  const periodo = await periodoActions.GetPeriodoProyecto(params.id);
  //facturasPeriodo
  const facturaActions =new FacturaPeriodoCrud();
  const facturas=await facturaActions.getAll();
  return (
    <>
      <BasePages title={t.Nav.facture.requestBilling} >
        <FactureCreate t={t} periodo={periodo} facturas={facturas} />
      </BasePages>
    </>
  );
}

export default page;
