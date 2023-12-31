import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations, useLocale } from "next-intl";
import FormPerfil from "@/app/[locale]/components/admin/perfil/FormPerfil";
function page({}) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Common.perfil")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow">
          <div className="container">
            <div className="card-cody mt-3"></div>
            <FormPerfil locale={locale} isCreate={true} isEdit={false}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;