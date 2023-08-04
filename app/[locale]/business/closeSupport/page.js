import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations } from "next-intl";
import FormBusiness from "../../components/business/FormBusiness";
import TableCommon from "../../components/common/TableCommon";
function page() {
  const t = useTranslations();
  const options = [
    { value: "optionX", label: "option1" },
    { value: "optionY", label: "option2" },
    // Agrega más opciones según sea necesario
  ];
  const generateRandomData = (rowCount) => {
    const data = [];
    for (let i = 1; i <= rowCount; i++) {
      const randomAge = Math.floor(Math.random() * 30) + 20; // Edad aleatoria entre 20 y 49
      data.push({
        id: i,
        name: `Person ${i}`,
        closingDate: randomAge,
        closingReal: randomAge,
        price: randomAge,
        amount: randomAge,
        status: `person${i}@example.com`,
        facture: `person${i}@example.com`,
        comments: `person${i}@example.com`,
      });
    }
    return data;
  };
  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: t("business.milestoneName") },
    { key: "closingDate", title: t("business.estimatedClosingDate") },
    { key: "closingReal", title: t("business.estimatedClosingDateReal") },
    { key: "price", title: `% ${t("Common.price")}` },
    { key: "amount", title: t("business.milestoneAmount") },
    { key: "status", title: t("business.milestoneStatus") },
    { key: "facture", title: t("business.milestoneFacture") },
    { key: "comments", title: t("business.generalComments") },
    // ... más columnas ...
  ];
  const data = generateRandomData(40);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Nav.business.insertSupport")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow container">
          <div className="d-flex justify-content-end mt-2">
            <div className="col-sm-2">
              <h6 className="text-end container">
                ID {t("business.title")} 12345678
              </h6>
            </div>
          </div>
          <FormBusiness t={t} />
          <hr />
          <div className="mb-3 row align-items-center ">
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
            <div className="col-sm-2">
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
              <input type="text" className="form-control" id="" value="" />
            </div>
            <div className="col-sm-1">
              <button className="badge btn btn-primary">
                {t("Common.include")} ...{" "}
              </button>
            </div>
          </div>
          <hr />
          <TableCommon
            columns={columns}
            noResultsFound={t("Common.noResultsFound")}
            data={data}
            title={t("business.agreedRate")}
            search={t("Ficha.table.search")}
            idioma={t("Account.action")}
          />
           <div className="d-flex justify-content-end mt-2 mb-2 container">
            <div className="col-sm-2">
              <button className="btn btn-primary">
                {t("Common.saveDraf")}
              </button>
            </div>
            <div className="col-sm-2">
              <button className="btn btn-primary">
                {t("business.saveClosing")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
