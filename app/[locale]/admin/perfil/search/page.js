import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import ListPerfil from "@/app/[locale]/components/admin/perfil/ListPerfil";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
function page() {
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
            <div className="card-cody mt-3 mb-3">
            <div className="d-flex justify-content-end container mb-3">
              <Link href={"/admin/perfil/create"}>
                <button type="button" className=" btn btn-primary ">
                  + {t("Account.add")} {t("Common.perfil")}
                </button>
              </Link>
            </div>
            <ListPerfil locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
