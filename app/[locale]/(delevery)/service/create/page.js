import React from "react";
import FormService from "@/app/[locale]/components/service/FormService";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations } from "next-intl";
import SelectField from "@/app/[locale]/components/common/SelectField";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import ButtonsProfessional from "@/app/[locale]/components/service/ButtonsProfessional";
import ButtonsPeriods from "@/app/[locale]/components/service/ButtonsPeriods"
function page() {
  const t = useTranslations();
  const kamOptions = [
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
        profile: `Person ${i}`,
        fee: randomAge,
        currency: randomAge,
        base: randomAge,
        status: randomAge,
        beginningValidity: `person${i}@example.com`,
        termValidity: randomAge,
        comments: randomAge,
      });
    }
    return data;
  };
  const columns = [
    { key: "id", title: "ID" },
    { key: "profile", title: `${t("service.assignedProfile")}` },
    { key: "fee", title: `${t("Common.fee")}` },
    { key: "currency", title: `${t("Common.currency")}` },
    { key: "base", title: t("Common.base") },
    { key: "status", title: `${t("Common.status")}` },
    {
      key: "beginningValidity",
      title: `${t("business.beginningValidity")}`,
    },
    { key: "termValidity", title: `${t("business.termValidity")}` },

    { key: "comments", title: `${t("business.generalComments")}` },
    // ... más columnas ...
  ];
  const data = generateRandomData(40);
  const options = kamOptions;
  // columns de profesionale
  const columnsProfessional = [
    { key: "id", title: "ID" },
    { key: "rut", title: `${t("Common.rut")}` },
    { key: "profile", title: `${t("Common.profile")}` },
    { key: "currency", title: `${t("service.assignmentDate")}` },
    { key: "base", title: t("Common.status") },
    { key: "status", title: `${t("Common.amount")}` },
    // ... más columnas ...
  ];
  const columnsPeriods = [
    { key: "id", title: "ID" },
    { key: "rut", title: `${t("Common.period")}` },
    { key: "profile", title: `${t("Common.profile")}` },
    { key: "currency", title: `N° ${t("Common.professionals")}` },
    { key: "base", title: t("project.ClosingDate") },
    { key: "status", title: `${t("Common.status")}` },
    // ... más columnas ...
  ];
  const actionsProfessionals=<ButtonsProfessional/>
  const actionsPeriods=<ButtonsPeriods/>
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Nav.services.addService")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow">
          <div className="container">
            <div className="d-flex justify-content-end mt-2"></div>
            <FormService t={t} title={t("project.businessClosing")} />
            <hr />
            <div className="mb-3 row align-items-center">
              <SelectField
                label={`${t("Common.coordinator")} ${t("Common.service")}`}
                options={kamOptions}
                preOption={t("Account.select")}
                labelClassName="col-sm-1 col-form-label"
                divClassName="col-sm-3"
              />
            </div>
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("Common.date")} Kick Off
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  id="estimatedClosingDate"
                />
              </div>
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("project.agreedTerm")}
              </label>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="estimatedClosingDate"
                />
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
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("project.agreedClosingDate")}
              </label>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="estimatedClosingDate"
                  disabled
                />
              </div>
            </div>
            <h4>{t("business.agreedRate")}</h4>
            <div className="mb-3 row align-items-center">
              <SelectField
                label={`${t("Common.profile")}`}
                options={kamOptions}
                preOption={t("Account.select")}
                labelClassName="col-sm-1 col-form-label"
                divClassName="col-sm-2"
              />
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("Common.fee")}
              </label>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="estimatedClosingDate"
                />
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
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("Common.base")}
              </label>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="estimatedClosingDate"
                />
              </div>
              <div className="col-sm-1">
                <button type="button" className="badge btn btn-success ">
                  {t("Common.up")}
                </button>
              </div>
            </div>

            <TableCommon
              columns={columns}
              noResultsFound={t("Common.noResultsFound")}
              data={data}
              title={t("Common.services")}
              search={t("Account.table.search")}
              idioma={t("Account.action")}
            />
            <hr />
            <h4>{t("service.assignedProfessionals")}</h4>
            <div className="d-flex justify-content-end mt-2 mb-2 ">
              <SelectField
                label={`${t("Common.period")}`}
                options={kamOptions}
                preOption={t("Account.select")}
                labelClassName="col-sm-1 col-form-label"
                divClassName="col-sm-2"
              />
            </div>
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("Common.rut")}
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  id="estimatedClosingDate"
                />
              </div>
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("Common.name")}
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  id="estimatedClosingDate"
                />
              </div>
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("service.assignmentDate")}
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  id="estimatedClosingDate"
                />
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("Common.profile")}
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  id="estimatedClosingDate"
                />
              </div>
              <div className="col-sm-3">
                <button className="badge btn btn-primary">
                  {t("Common.add")}
                </button>
              </div>
            </div>
            <hr />
            <TableCommon
              columns={columnsProfessional}
              noResultsFound={t("Common.noResultsFound")}
              data={data}
              search={t("Account.table.search")}
              idioma={t("Account.action")}
              actions={actionsProfessionals}
            />
            <div className="d-flex justify-content-end mt-2 mb-2 ">
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                TOTAL :
              </label>
              <div className="col-sm-1">
                <input
                  type="text"
                  className="form-control"
                  id="estimatedClosingDate"
                />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2 mb-2 ">
              <button className="btn btn-primary">
                {t("service.preClosingPeriods")}
              </button>
          </div>
          <hr/>
          <TableCommon
              columns={columnsPeriods}
              noResultsFound={t("Common.noResultsFound")}
              data={data}
              title={t("service.closedPeriods")}
              search={t("Account.table.search")}
              idioma={t("Account.action")}
              actions={actionsPeriods}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
