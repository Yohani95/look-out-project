import React from "react";
import { useTranslations } from "next-intl";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import SelectField from "@/app/[locale]/components/common/SelectField";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import ButtonsNovelty from "@/app/[locale]/components/service/ButtonsNovelty";
function page() {
  const t = useTranslations();
  const generateRandomData = (rowCount) => {
    const data = [];
    for (let i = 1; i <= rowCount; i++) {
      const randomAge = Math.floor(Math.random() * 30) + 20; // Edad aleatoria entre 20 y 49
      data.push({
        id: i,
        period: `Person ${i}`,
        client: randomAge,
        service: randomAge,
        type: randomAge,
        from: randomAge,
        until: `person${i}@example.com`,
        observations: randomAge,
        comments: randomAge,
      });
    }
    return data;
  };
  const kamOptions = [
    { value: "optionX", label: "option1" },
    { value: "optionY", label: "option2" },
    // Agrega más opciones según sea necesario
  ];
  const columnsPeriods = [
    { key: "id", title: "ID" },
    { key: "period", title: `${t("Common.period")}` },
    { key: "client", title: `${t("Common.client")}` },
    { key: "service", title: `N° ${t("Common.service")}` },
    { key: "type", title: t("service.noveltyType") },
    { key: "from", title: `${t("Common.from")}` },
    { key: "until", title: `${t("Common.until")}` },
    { key: "observations", title: `${t("Common.observations")}` },
    // ... más columnas ...
  ];
  const data = generateRandomData(40);
  const actions = <ButtonsNovelty />;
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Nav.services.createNovelty")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
          <div className="container mt-4 mb-4">
            <h4>{t("service.noveltyByProfessional")}</h4>
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
                {t("Common.name")}
              </label>
              <div className="col-sm-5">
                <input type="text" className="form-control" id="name" />
              </div>
            </div>
            <hr />

            <div className="mb-3 row align-items-center">
              <SelectField
                label={`${t("service.noveltyType")}`}
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
                {t("service.noveltyDate")}
              </label>
              <div className="col-sm-5">
                <input type="text" className="form-control" id="rut" />
              </div>
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t("service.dateTo")}
              </label>
              <div className="col-sm-5">
                <input type="text" className="form-control" id="rut" />
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <SelectField
                label={`${t("service.newRol")}`}
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
                {t("Common.observations")}
              </label>
              <div className="col-sm-11">
                <textarea type="text-area" className="form-control" id="rut" />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2 mb-2 ">
              <button className="btn btn-primary">{t("Common.add")}</button>
            </div>
            <hr />
            <TableCommon
              columns={columnsPeriods}
              noResultsFound={t("Common.noResultsFound")}
              data={data}
              title={t("service.historyNovelty")}
              search={t("Account.table.search")}
              idioma={t("Account.action")}
              actions={actions}
            />
            <div className="d-flex justify-content-end mt-2 mb-2 ">
              <button className="btn btn-primary">{t("Common.add")}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
