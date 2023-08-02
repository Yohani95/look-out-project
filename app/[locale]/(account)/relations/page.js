import React from "react";
import { useTranslations } from "next-intl";
import TableTableCommon from "@/app/[locale]/components/common/TableCommon";
import MyTitle from "../../components/common/MyTitle";
function page() {
  const t = useTranslations();
  const data = [
    { id: 1, name: "John Doe", position: "Manager", email: "john@example.com" },
    {
      id: 2,
      name: "Jane Smith",
      position: "Supervisor",
      email: "jane@example.com",
    },
    {
      id: 3,
      name: "Jane Smith",
      position: "Supervisor",
      email: "jane@example.com",
    },
    {
      id: 4,
      name: "Jane Smith",
      position: "Supervisor",
      email: "jane@example.com",
    },
    {
      id: 5,
      name: "Jane Smith",
      position: "Supervisor",
      email: "jane@example.com",
    },
    {
      id: 6,
      name: "Jane Smith",
      position: "Supervisor",
      email: "jane@example.com",
    },

    // Otros objetos
  ];

  const columns = [
    { title: t("Ficha.name"), key: "id" },
    { title: t("Ficha.place"), key: "name" },
    { title: t("Ficha.country"), key: "position" },
    { title: t("Ficha.Email"), key: "email" },
  ];
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
        <MyTitle title={t("Nav.account.accountRelationship")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
          <div className="container mt-4 mb-4">
            <TableTableCommon
              title={t("Nav.account.accountRelationship")}
              data={data}
              columns={columns}
              search={t("Ficha.table.search")}
              noResultsFound={t('Common.noResultsFound')}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
