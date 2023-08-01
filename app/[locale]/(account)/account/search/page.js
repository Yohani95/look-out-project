import React from "react";
import { useTranslations } from "next-intl";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import Table from "@/app/[locale]/components/account/Table";
function page() {
  const t = useTranslations("Account");
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
    { Header: t("name"), accessor: "id" },
    { Header: t("place"), accessor: "name" },
    { Header: t("country"), accessor: "position" },
    { Header: t("KAM"), accessor: "email" },
  ];
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("findAccount")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
          <div className="container mt-4 mb-4">
            <div className="d-flex justify-content-end mb-3">
              <button type="button" className="btn btn-primary me-2">
               + {t("new")} {t("account")}
              </button>
            </div>
            <Table
              title=""
              data={data}
              columns={columns}
              search={t("table.search")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
