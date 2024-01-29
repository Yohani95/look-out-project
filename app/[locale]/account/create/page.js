import React from "react";
import { useTranslations,useLocale } from "next-intl";
import Form from "@/app/[locale]/components/account/Form";
import Table from "@/app/[locale]/components/account/Table";
import SelectField from "../../../components/common/SelectField";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import TableCommon from "@/app/[locale]/components/common/TableCommon"
import ContactList from "@/app/[locale]/components/contact/ContactList"
function page() {
  const t = useTranslations();
  const locale=useLocale()
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Account.title")} />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="card col-lg-10 shadow">
          <div className="container">
            <Form locale={locale} isEdit={false} isCreate={true}/>
            {/* <div className="mb-3 row align-items-center">
              <SelectField
                options={countryOptions}
                preOption={t("Account.select")}
                divClassName="col-sm-4 mb-2"
              />
              <div className="col-sm-3">
                <button type="button" className="btn btn-primary mb-2">
                  {t("Account.select")}
                </button>
              </div>
            </div> */}
           {/* <ContactList locale={locale}/> */}
            {/* <div className="d-flex justify-content-end mb-3">
              <button type="button" className="btn btn-primary me-2">
                {t("Account.saveButton")}
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
