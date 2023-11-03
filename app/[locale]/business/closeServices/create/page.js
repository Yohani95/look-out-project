import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations, useLocale } from "next-intl";
import FormBusiness from "@/app/[locale]/components/business/FormBusiness";
import FormService from "@/app/[locale]/components/business/Services/FormService";
import BasePages from "@/app/[locale]/components/common/BasePages";
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <BasePages title={`${t("Nav.business.insertServices")}`}>
      <FormService locale={locale} isCreate={true} isEdit={false} />
    </BasePages>
  );
}

export default page;
