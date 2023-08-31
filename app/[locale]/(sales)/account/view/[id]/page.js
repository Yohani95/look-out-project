import React from "react";
import { useTranslations,useLocale } from "next-intl";
import Form from "@/app/[locale]/components/account/Form";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
function page({params}) {
  const t = useTranslations();
  const locale=useLocale()
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Common.account")} />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="card col-lg-10 shadow">
          <div className="container">
            <Form locale={locale} isEdit={false} isCreate={false} idPerson={params.id}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;