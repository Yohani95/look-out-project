import React from "react";
import { useTranslations,useLocale } from "next-intl";
import Form from "@/app/[locale]/components/account/Form";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
function page() {
  const t = useTranslations();
  const locale=useLocale()
  // Aquí defines las opciones para cada select
  const data = [
    {
      id: 1,
      name: "John Doe",
      position: "Manager",
      email: "john@example.com",
      phone: "1234567890",
      rol: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Supervisor",
      email: "jane@example.com",
      phone: "9876543210",
      rol: "User",
    },
    {
      id: 3,
      name: "Jane Smith",
      position: "Supervisor",
      email: "jane@example.com",
      phone: "9876543210",
      rol: "User",
    },
    {
      id: 4,
      name: "Jane Smith",
      position: "Supervisor",
      email: "jane@example.com",
      phone: "9876543210",
      rol: "User",
    },
    {
      id: 5,
      name: "Jane Smith",
      position: "Supervisor",
      email: "jane@example.com",
      phone: "9876543210",
      rol: "User",
    },
    {
      id: 6,
      name: "Jane Smith",
      position: "Supervisor",
      email: "jane@example.com",
      phone: "9876543210",
      rol: "User",
    },

    // Otros objetos
  ];
  const columns = [
    { key: 'id', title: t("Ficha.table.id") },
    { key: 'name', title: t("Ficha.table.contacts.name") },
    { key: 'position', title: t("Ficha.position") },
    { key: 'email', title: t("Ficha.Email") },
    { key: 'phone', title: t("Ficha.phone") },
    { key: 'rol', title: t("Ficha.table.contacts.rol") },
  ];
   
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
        <MyTitle title={t("Ficha.title")} />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="card col-lg-10 shadow">
          <div className="container">
            <Form locale={locale} />
            <TableCommon
              columns={columns}
              data={data}
              title={t("Ficha.table.contacts.title")}
              search={t("Ficha.table.search")}
              noResultsFound={t('Common.noResultsFound')}
            />
            <TableCommon
              columns={columns}
              noResultsFound={t('Common.noResultsFound')}
              data={data}
              title={t("Ficha.table.business.title")}
              search={t("Ficha.table.search")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
