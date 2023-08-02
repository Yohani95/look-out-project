import React from "react";
import { useTranslations } from "next-intl";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import ActionButtons from '@/app/[locale]/components/contact/ActionButtons'
function page() {
  const t = useTranslations();
  const data = [
    { id: 1, name: "John Doe", position: "Manager", email: "john@example.com" }
    // Otros objetos
  ];
const columns = [
    { title: t("Ficha.name"), key: "id" },
    { title: t("Ficha.place"), key: "name" },
    { title: t("Ficha.country"), key: "position" },
    { title: t("Ficha.Email"), key: "email" },
  ];
  
  const actions = <ActionButtons/>;
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Account.findAccount")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
          <div className="container mt-4 mb-4">
            <div className="d-flex justify-content-end mb-3">
              <button type="button" className="btn btn-primary me-2">
                + {t("Account.new")} {t("Account.account")}
              </button>
            </div>
            <TableCommon
              columns={columns}
              noResultsFound={t("Common.noResultsFound")}
              data={data}
              title={t("Account.account")}
              search={t("Account.table.search")}
              actions={actions}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
