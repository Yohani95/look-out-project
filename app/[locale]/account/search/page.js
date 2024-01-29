import React from "react";
import { useTranslations, useLocale } from "next-intl";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import List from "@/app/[locale]/components/account/List";
import Link from "next/link";
function page() {
  const t = useTranslations();
  const locale=useLocale();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Account.findAccount")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
          <div className="container mt-4 mb-4">
            <div className="d-flex justify-content-end mb-3">
            <Link href={'/account/relations'}>
              <button type="button" className="btn btn-secondary me-2">
               {t("Ficha.button.see_relations")}
              </button>
              </Link>
            <Link href={'/account/create'}>
              <button type="button" className="btn btn-primary me-2">
                + {t("Account.new")} {t("Account.account")}
              </button>
              </Link>
            </div>
              <List locale={locale} />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
