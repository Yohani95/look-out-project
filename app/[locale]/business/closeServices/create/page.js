import React from "react";
import { useTranslations, useLocale } from "next-intl";
import FormService from "@/app/[locale]/components/business/Services/FormService";
import BasePages from "@/app/[locale]/components/common/BasePages";
import { GetData } from "@/app/[locale]/utils/business/UtilsService";
import ServiceCreate from "../../../components/business/Services/ServiceCreate";
async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  return (
    <BasePages title={t.Nav.business.insertServices}>
      <ServiceCreate locale={locale} data={data} t={t}/>
    </BasePages>
  );
}

export default page;
