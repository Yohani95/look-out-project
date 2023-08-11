import React from "react";
import { useTranslations } from "next-intl";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import ActionButtons from '@/app/[locale]/components/project/ActionButtons'
function page() {
  const t = useTranslations();
  const generateRandomData = (rowCount) => {
    const data = [];
    for (let i = 1; i <= rowCount; i++) {
      const randomAge = Math.floor(Math.random() * 30) + 20; // Edad aleatoria entre 20 y 49
      data.push({
        id: i,
        project: `Person ${i}`,
        coor: randomAge,
        status: randomAge,
        status: randomAge,
        dateStart: randomAge,
        dateEnd: `person${i}@example.com`,
      });
    }
    return data;
  };
  const columns = [
    { key: "id", title: "ID" },
    { key: "project", title: `${t("Common.project")}`} ,
    { key: "coor", title: `${t("Common.coordinator")}` },
    { key: "status", title: t("Account.status") },
    { key: "dateStart", title: t("project.dateStart") },
    { key: "dateEnd", title: t("project.dateEnd") },
    // ... más columnas ...
  ];
  const data = generateRandomData(40);
  
  const actions = <ActionButtons/>;
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Common.services")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
          <div className="container mt-4 mb-4">

            <TableCommon
              columns={columns}
              noResultsFound={t("Common.noResultsFound")}
              data={data}
              title={t("Common.services")}
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
