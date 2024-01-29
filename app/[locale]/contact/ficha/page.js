import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations,useLocale }  from "next-intl";
import FormContact from "@/app/[locale]/components/contact/FormContact";
function page() {
  const t = useTranslations();
  const locale=useLocale();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Nav.contacts.file")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow">
          <div className="d-flex justify-content-end mt-2">
            <button type="button" className="badge  btn btn-success me-2">
              {t("Account.button.Modify")}
            </button>
            <button type="button" className="badge  btn btn-danger me-2">
               {t("Common.delete")}
            </button>
          </div>
          <FormContact locale={locale} />
        </div>
      </div>
    </>
  );
}

export default page;
