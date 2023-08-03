import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations } from "next-intl";
import FormContact from "@/app/[locale]/components/contact/FormContact";
function page() {
  const t = useTranslations();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Nav.contacts.create")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow">
          <div className="d-flex justify-content-end mt-2">
            <button type="button" className="badge rounded-pill btn btn-primary me-2">
              + {t("Nav.contacts.create")}
            </button>
          </div>
          <FormContact t={t} />
        </div>
      </div>
    </>
  );
}

export default page;
