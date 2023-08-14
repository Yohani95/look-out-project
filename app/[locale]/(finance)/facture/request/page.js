import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations } from "next-intl";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import ButtonsRequest from "@/app/[locale]/components/facture/ButtonsRequest";
function page() {
  const t = useTranslations();
  const generateRandomData = (rowCount) => {
    const data = [];
    for (let i = 1; i <= rowCount; i++) {
      const randomAge = Math.floor(Math.random() * 30) + 20; // Edad aleatoria entre 20 y 49
      data.push({
        id: i,
        rut: `Person ${i}`,
        name: randomAge,
        oc: randomAge,
        hes: randomAge,
        amount: randomAge,
        date: `person${i}@example.com`,
      });
    }
    return data;
  };
  const columns = [
    { key: "id", title: "ID" },
    { key: "rut", title: `${t("Common.rut")}` },
    { key: "name", title: `${t("facture.businessName")}` },
    { key: "oc", title: `OC` },
    { key: "hes", title: "HES" },
    { key: "amount", title: t("Common.amount") },
    { key: "date", title: `${t("facture.applicationDate")} ` },
    // ... más columnas ...
  ];
  const data = generateRandomData(40);
  const actions = <ButtonsRequest />;
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Nav.facture.requestBilling")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
          <div className="container mt-4 mb-4">
            <h4>{t("Nav.facture.requestBilling")}</h4>
            <br />
            <fieldset disabled>
              <div className="mb-3 row align-items-center">
                <label
                  htmlFor="estimatedClosingDate"
                  className="col-sm-1 col-form-label"
                >
                  {t("Common.rut")}
                </label>
                <div className="col-sm-5">
                  <input type="text" className="form-control" id="rut" />
                </div>
                <label htmlFor="name" className="col-sm-1 col-form-label">
                  {t("Common.account")}
                </label>
                <div className="col-sm-5">
                  <input type="text" className="form-control" id="name" />
                </div>
              </div>
              <div className="mb-3 row align-items-center">
                <label
                  htmlFor="estimatedClosingDate"
                  className="col-sm-1 col-form-label"
                >
                  {t("facture.project")}
                </label>
                <div className="col-sm-5">
                  <input type="text" className="form-control" id="rut" />
                </div>
              </div>
              <div className="mb-3 row align-items-center">
                <label
                  htmlFor="estimatedClosingDate"
                  className="col-sm-1 col-form-label"
                >
                  {t("Common.milestone")}
                </label>
                <div className="col-sm-5">
                  <input type="text" className="form-control" id="rut" />
                </div>
              </div>
              <div className="mb-3 row align-items-center">
                <label
                  htmlFor="estimatedClosingDate"
                  className="col-sm-1 col-form-label"
                >
                  {t("Common.amount")}
                </label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="rut" />
                </div>
              </div>
            </fieldset>
            <hr />
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("Common.rut")}
              </label>
              <div className="col-sm-5">
                <input type="text" className="form-control" id="rut" />
              </div>
              <label htmlFor="name" className="col-sm-1 col-form-label">
                {t("facture.businessName")}
              </label>
              <div className="col-sm-5">
                <input type="text" className="form-control" id="name" />
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("facture.purchaseOrder")}
              </label>
              <div className="col-sm-2">
                <input type="text" className="form-control" id="rut" />
              </div>
              <label htmlFor="name" className="col-sm-1 col-form-label">
                N°
              </label>
              <div className="col-sm-1">
                <input type="number" className="form-control" id="name" />
              </div>
              <label htmlFor="name" className="col-sm-1 col-form-label">
                {t("Common.date")}
              </label>
              <div className="col-sm-2">
                <input type="text" className="form-control" id="name" />
              </div>
              <label htmlFor="amount" className="col-sm-1 col-form-label">
                {t("Common.amount")}
              </label>
              <div className="col-sm-2">
                <input type="number" className="form-control" id="name" />
              </div>
              <div className="col-sm-1">
                <button className="badge btn btn-primary">
                  {t("Common.attach")}
                </button>
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("facture.purchaseOrder")}
              </label>
              <div className="col-sm-2">
                <input type="text" className="form-control" id="rut" />
              </div>
              <label htmlFor="name" className="col-sm-1 col-form-label">
                N°
              </label>
              <div className="col-sm-1">
                <input type="number" className="form-control" id="name" />
              </div>
              <label htmlFor="name" className="col-sm-1 col-form-label">
                {t("Common.date")}
              </label>
              <div className="col-sm-2">
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="col-sm-1">
                <button className="badge btn btn-primary">
                  {t("Common.attach")}
                </button>
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("Common.observations")}
              </label>
              <div className="col-sm-10">
                <textarea type="text" className="form-control" id="rut" />
              </div>
              <div className="col-sm-1">
                <button className="badge btn btn-primary">
                  {t("Common.add")}
                </button>
              </div>
            </div>
            <hr />
            <TableCommon
              columns={columns}
              noResultsFound={t("Common.noResultsFound")}
              data={data}
              title={t("facture.requestedInvoices")}
              search={t("Account.table.search")}
              actions={actions}
              idioma={t("Account.action")}
            />
            <div className="d-flex justify-content-end mt-2 mb-2 ">
              <button className="btn btn-primary">{t("Common.request")}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
