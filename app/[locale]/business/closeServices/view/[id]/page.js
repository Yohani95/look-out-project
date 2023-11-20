import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations, useLocale } from "next-intl";
import FormService from "@/app/[locale]/components/business/Services/FormService";
import BasePages from "@/app/[locale]/components/common/BasePages";
import { GetData } from "@/app/[locale]/utils/business/UtilsService";
async function page({ params }) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data=await GetData();
  return (
    <BasePages title={t.business.title}>
      <FormService
        locale={locale}
        isEdit={false}
        isCreate={false}
        idService={params.id}
        data={data}
      />
    </BasePages>
  );
}

export default page;
