import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations, useLocale } from "next-intl";
import ContactSearch from "@/app/[locale]/components/contact/ContactSearch";
import Link from "next/link";
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle
            title={`${t("Common.search")} ${t("Account.table.contacts.title")}`}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow">
          <div className="container mt-4 mb-4">
            <div className="d-flex justify-content-end container mb-3">
              <Link href={"/contact/create"}>
                <button type="button" className=" btn btn-primary ">
                  + {t("Account.add")} {t("Account.table.contacts.title")}
                </button>
              </Link>
            </div>
            <ContactSearch locale={locale} />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
