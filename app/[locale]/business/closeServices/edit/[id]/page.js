import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useLocale } from "next-intl";
import FormService from "@/app/[locale]/components/business/Services/FormService";
import BasePages from "@/app/[locale]/components/common/BasePages";
import { GetData } from "@/app/[locale]/utils/business/UtilsService";
import ServiceEdit from "@/app/[locale]/components/business/Services/ServiceEdit";
async function page({ params }) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data=await GetData();
  return (
    <BasePages title={t.business.title}>
      <ServiceEdit t={t} idService={params.id} data={data}/>
    </BasePages>
  );
}

export default page;
