import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations,useLocale } from "next-intl";
import FormContact from "@/app/[locale]/components/contact/FormContact";
function page({params}) {
  const t = useTranslations();
  const locale=useLocale();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Nav.contacts.edit")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow">
          <div className="container">
          <div className="card-cody mt-3">
            <FormContact locale={locale} isEdit={true} isCreate={false} idPerson={params.id} />
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
