import React from "react";
import { useTranslations } from "next-intl";
import From from "@/app/[locale]/components/account/Form";
import Table from "@/app/[locale]/components/account/Table";
import SelectField from "../../components/common/SelectField";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import TableCommon from "@/app/[locale]/components/common/TableCommon"
function page() {
  const t = useTranslations();
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
    { key: 'id', title: "check" },
    { key: 'name', title: t("Account.table.contacts.name") },
    { key: 'position', title: t("Account.position") },
    { key: 'email', title: t("Account.Email") },
    { key: 'phone', title: t("Account.phone") },
    { key: 'rol', title: t("Account.table.contacts.owner") },
  ];
  

  const countryOptions = [
    { value: "option1", label: "option1" },
    { value: "option2", label: "option2" },
    // Agrega más opciones según sea necesario
  ];
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Account.title")} />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="card col-lg-10 shadow">
          <div className="container">
            <From t={useTranslations('Account')} />
            <div className="mb-3 row align-items-center">
              <SelectField
                options={countryOptions}
                preOption={t("Account.select")}
                divClassName="col-sm-4 mb-2"
              />
              <div className="col-sm-3">
                <button type="button" className="btn btn-primary mb-2">
                  {t("Account.select")}
                </button>
              </div>
            </div>
            <TableCommon
              columns={columns}
              data={data}
              title={t("Account.table.contacts.title")}
              search={t("Account.table.search")}
              noResultsFound={t('Common.noResultsFound')}
            />
            <div className="d-flex justify-content-end mb-3">
              <button type="button" className="btn btn-primary me-2">
                {t("Account.saveButton")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
