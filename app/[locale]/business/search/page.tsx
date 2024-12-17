import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import { useTranslations } from "next-intl";
import ActionButtons from "@/app/[locale]/components/business/ActionButtons";
function page() {
  const t = useTranslations();
  const generateRandomData = (rowCount) => {
    const data = [];
    for (let i = 1; i <= rowCount; i++) {
      const randomAge = Math.floor(Math.random() * 30) + 20; // Edad aleatoria entre 20 y 49
      data.push({
        id: i,
        name: `Person ${i}`,
        position: randomAge,
        account: randomAge,
        kam: randomAge,
        phone: randomAge,
        email: `person${i}@example.com`,
      });
    }
    return data;
  };
  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: `${t("Account.name")}`} ,
    { key: "position", title: `${t("Account.business_name")}` },
    { key: "account", title: t("Account.type") },
    { key: "kam", title: t("Account.KAM") },
    { key: "phone", title: t("Account.status") },
    { key: "email", title: t("Ficha.table.business.dateEnd") },
    // ... más columnas ...
  ];
  const data = generateRandomData(40);
  const actions = <ActionButtons />;
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={`${t("Common.search")} ${t("Account.business")}`} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow">
          <div className="d-flex justify-content-end container mt-2">
            <button type="button" className="btn btn-primary ">
              + {t("Account.add")} {t("Account.business")}
            </button>
          </div>
          <TableCommon
            columns={columns}
            noResultsFound={t("Common.noResultsFound")}
            data={data}
            title={t("Account.business")}
            search={t("Ficha.table.search")}
            actions={actions}
            idioma={t("Account.action")}
          />
        </div>
      </div>
    </>
  );
}

export default page;
