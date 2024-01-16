import React from "react";
import { useTranslations,useLocale} from "next-intl";
import MyTitle from "../../../components/common/MyTitle";
import ListRelations from "@/app/[locale]/components/account/ListRelations";
import Link from "next/link";
function page() {
  const t = useTranslations();
  const locale=useLocale()

  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
        <MyTitle title={t("Nav.account.accountRelationship")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
          <div className="container mt-4 mb-4">
          <ListRelations locale={locale}/>
          <div className="d-flex justify-content-end mb-3">
            <Link href={"/account/search"}>
            <button
              type="button"
              className="btn btn-danger m-2"
            >
              {t('Common.goBack')}
            </button>
            </Link>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
