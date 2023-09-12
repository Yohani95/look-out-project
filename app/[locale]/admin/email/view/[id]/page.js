import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations, useLocale } from "next-intl";
import FormEmail from "@/app/[locale]/components/admin/email/FormEmail";
function page(params) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Common.email")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow">
          <div className="container">
            <div className="card-cody mt-3">
              <FormEmail locale={locale} isCreate={false} isEdit={false} idEmail={params.id}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
