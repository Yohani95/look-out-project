import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations,useLocale } from "next-intl";
import ListService from "@/app/[locale]/components/business/Services/ListService";
import Link from "next/link";
function page() {
  const t = useTranslations();
  const locale=useLocale();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={`${t("Nav.business.insertServices")}`} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow ">
        <div className="container card-cody mt-3 mb-3">
          <div className="d-flex justify-content-end container mb-3">
              <Link href={"/business/closeServices/create"}>
                <button type="button" className=" btn btn-primary ">
                  + {t("Account.add")} {t("Common.services")}
                </button>
              </Link>
            </div>
            <ListService locale={locale}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
               
                {/* <div className="mb-3 row align-items-center ">
            <label htmlFor="" className="col-sm-1 col-form-label">
              {t("Common.profile")}
            </label>
            <div className="col-sm-2">
              <select className="form-control form-select">
                <option value="">{t("Account.select")}</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <label htmlFor="" className="col-sm-1 col-form-label">
              {t("Common.fee")}
            </label>
            <div className="col-sm-1">
              <input type="text" className="form-control" id="" value="" />
            </div>
            <div className="col-sm-2">
              <select className="form-control form-select">
                <option value="">{t("Account.select")}</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <label htmlFor="" className="col-sm-1 col-form-label">
              {t("Common.base")}
            </label>
            <div className="col-sm-2">
              <select className="form-control form-select">
                <option value="">{t("Account.select")}</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <label htmlFor="" className="col-sm-1 col-form-label">
              {t("Common.base")}
            </label>
            <div className="col-sm-1">
            <input type="text" className="form-control" id="" value="" />
            </div>
          </div> */}
          {/* <TableCommon
            columns={columns}
            noResultsFound={t("Common.noResultsFound")}
            data={data}
            title={t("business.historyContractedSupports")}
            search={t("Ficha.table.search")}
            idioma={t("Account.action")}
          /> */}