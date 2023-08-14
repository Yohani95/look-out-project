import React from "react";
import { useTranslations } from "next-intl";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import ActionButtons from '@/app/[locale]/components/project/ActionButtons';
import ButtonsFacture from '@/app/[locale]/components/facture/ButtonsFacture'
function page() {
  const t = useTranslations();
  const generateRandomData = (rowCount) => {
    const data = [];
    for (let i = 1; i <= rowCount; i++) {
      const randomAge = Math.floor(Math.random() * 30) + 20; // Edad aleatoria entre 20 y 49
      data.push({
        id: i,
        type: `Person ${i}`,
        name: randomAge,
        period: randomAge,
        kam: randomAge,
        expiration: randomAge,
        status: `person${i}@example.com`,
      });
    }
    return data;
  };
  const columns = [
    { key: "id", title: "ID" },
    { key: "type", title: `${t("Common.project")}`} ,
    { key: "name", title: `${t("Account.business_name")}` },
    { key: "period", title: `${t("Common.milestone")}/${t("Common.period")}` },
    { key: "kam", title: t("Account.KAM") },
    { key: "expiration", title: t("Common.expiration") },
    { key: "status", title: `${t("Common.status")} Fact.` }
    // ... más columnas ...
  ];
  const data = generateRandomData(40);
  
  const actions = <ButtonsFacture/>;
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Nav.facture.billing")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
          <div className="container mt-4 mb-4">

            <TableCommon
              columns={columns}
              noResultsFound={t("Common.noResultsFound")}
              data={data}
              title={t("facture.billingDetails")}
              search={t("Account.table.search")}
              actions={actions}
              idioma={t("Account.action")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
