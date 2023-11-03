import React from "react";
import { useTranslations,useLocale } from "next-intl";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import FormNovelty from "@/app/[locale]/components/business/Services/FormNovelty";
import ButtonsNovelty from "@/app/[locale]/components/service/ButtonsNovelty";
function page({params}) {
  const t = useTranslations();
  const locale=useLocale();
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
            <FormNovelty locale={locale} idPersona={params.idPersona} idProyecto={params.IdProject}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
