import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations, useLocale } from "next-intl";
import FormPhone from "@/app/[locale]/components/admin/phone/PhoneForm";
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Account.phone")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-8 shadow">
          <div className="card-cody mt-3 mb-3">
            <div className="container">
              <FormPhone locale={locale} isEdit={false} isCreate={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
