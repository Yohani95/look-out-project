import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations,useLocale } from "next-intl";
import FormBusiness from "@/app/[locale]/components/business/FormBusiness";
import FormService from "@/app/[locale]/components/business/Services/FormService";
function page() {
  const t = useTranslations();
  const locale=useLocale();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={`${t("Nav.business.insertServices")}`} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow ">
          <div className="container">
            <FormService locale={locale}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
