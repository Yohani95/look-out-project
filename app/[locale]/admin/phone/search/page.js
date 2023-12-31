import React from "react";
import { useTranslations, useLocale } from "next-intl";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import ListPhone from "@/app/[locale]/components/admin/phone/ListPhone";
import Link from "next/link";
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Nav.administration.userList")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
        <div className="container card-cody mt-3 mb-3">
            <div className="d-flex justify-content-end container mb-3">
              <Link href={"/admin/phone/create"}>
                <button type="button" className=" btn btn-primary ">
                  + {t("Account.add")} {t("Common.phone")}
                </button>
              </Link>
            </div>
            <ListPhone locale={locale}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
