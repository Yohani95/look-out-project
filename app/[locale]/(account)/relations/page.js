import React from "react";
import { useTranslations } from "next-intl";
import Table from "@/app/[locale]/components/account/Table";
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
    { Header: t("Ficha.name"), accessor: "id" },
    { Header: t("Ficha.place"), accessor: "name" },
    { Header: t("Ficha.country"), accessor: "position" },
    { Header: t("Ficha.KAM"), accessor: "email" },
  ];
  return (
    <div className="d-flex justify-content-center align-items-center m-4">
      <div className="card col-lg-10">
        <div className="card-header  text-center">
          <h3>{t("Nav.account.accountRelationship")}</h3>
        </div>
        <div className='container'>
          <Table data={data} columns={columns} search={t('Ficha.table.search')}/>
        </div>
      </div>
    </div>
  );
}

export default page;
