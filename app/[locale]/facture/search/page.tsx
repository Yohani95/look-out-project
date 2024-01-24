import React from "react";
import { useLocale} from "next-intl";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import BasePages from "@/app/[locale]/components/common/BasePages";
import ButtonsFacture from '@/app/[locale]/components/facture/ButtonsFacture'
import FacturasSolicitadasSearch from "../../components/facture/FacturasSolicitadas/FacturasSolicitadasSearch";
function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  // const columns = [
  //   { key: "id", title: "ID" },
  //   { key: "type", title: `${t("Common.project")}`} ,
  //   { key: "name", title: `${t("Account.business_name")}` },
  //   { key: "period", title: `${t("Common.milestone")}/${t("Common.period")}` },
  //   { key: "kam", title: t("Account.KAM") },
  //   { key: "expiration", title: t("Common.expiration") },
  //   { key: "status", title: `${t("Common.status")} Fact.` }
  //   // ... más columnas ...
  // ];
  return (
      <BasePages title={t.Nav.facture.billing}>
        <FacturasSolicitadasSearch t={t}/>
      </BasePages>
  );
}

export default page;
