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
        assignedProfile: `Person ${i}`,
        fee: randomAge,
        currency: randomAge,
        base: randomAge,
        status: randomAge,
        beginningValidity: `person${i}@example.com`,
        termValidity: `person${i}@example.com`,
        generalComments: `person${i}@example.com`,
      });
    }
    return data;
  };
  const columns = [
    { key: "id", title: "ID" },
    { key: "assignedProfile", title: t("business.assignedProfile") },
    { key: "fee", title: t("Common.fee") },
    { key: "currency", title: t("Common.currency") },
    { key: "base", title: `% ${t("Common.base")}` },
    { key: "status", title: t("Common.status") },
    { key: "beginningValidity", title: t("business.beginningValidity") },
    { key: "termValidity", title: t("business.termValidity") },
    { key: "generalComments", title: t("business.generalComments") },
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
        <div className="card col-lg-10 shadow ">
        <form>
        <div className="container">
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
              <label htmlFor="profile" className="col-sm-1 col-form-label">
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
              <label htmlFor="fee" className="col-sm-1 col-form-label">
                {t("Common.fee")}
              </label>
              <div className="col-sm-2">
                <input type="number" className="form-control" id="fee" />
              </div>
              <div className="col-sm-2">
                <select className="form-control form-select">
                  <option>{t("Account.select")}</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <label htmlFor="base" className="col-sm-1 col-form-label">
                {t("Common.base")}
              </label>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="base"
                  name="base"
                />
              </div>
              <div className="col-sm-1">
                <button type="button" className="badge btn btn-primary">
                  {t("Common.include")} ...{" "}
                </button>
              </div>
            </div>
            <hr />
            </div>
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
                <button type="button" className="btn btn-primary">
                  {t("Common.saveDraf")}
                </button>
              </div>
              <div className="col-sm-2">
                <button type="button" className="btn btn-primary">
                  {t("business.saveClosing")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
