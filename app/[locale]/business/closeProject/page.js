import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations } from "next-intl";
import FormBusiness from "../../components/business/FormBusiness";
function page() {
  const t = useTranslations();
  
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={`${t("Common.search")} ${t("Account.business")}`} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow">
          <div className="d-flex justify-content-end mt-2">
            <div class="col-sm-2">
              <h6 className="text-end container">ID 12345678</h6>
            </div>
          </div>
          <FormBusiness t={t}/>
        </div>
      </div>
    </>
  );
}

export default page;
