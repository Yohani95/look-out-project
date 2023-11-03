import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations, useLocale } from "next-intl";
import FormService from "@/app/[locale]/components/business/Services/FormService";
import BasePages from "@/app/[locale]/components/common/BasePages";
function page({ params }) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <BasePages title={`${t("business.title")}`}>
      <FormService
        locale={locale}
        isEdit={true}
        isCreate={false}
        idService={params.id}
      />
    </BasePages>
  );
}

export default page;
