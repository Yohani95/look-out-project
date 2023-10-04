import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations, useLocale } from "next-intl";
import FormPerfil from "@/app/[locale]/components/admin/perfil/FormPerfil";
function page({params}) {
  const t = useTranslations();
  const locale = useLocale();
  console.log("Params: "+ params);
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
            <div className="card-cody mt-3">
              <FormPerfil locale={locale} isCreate={false} isEdit={false} idPerfil={params.id}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;