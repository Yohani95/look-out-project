import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations, useLocale } from "next-intl";
import FormEmail from "@/app/[locale]/components/admin/email/FormEmail";
import BasePages from "@/app/[locale]/components/common/BasePages";
function page({ params }) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <BasePages title={`${t("Common.create")} ${t("Common.email")}`}>
        <FormEmail locale={locale} isCreate={true} isEdit={false} />
      </BasePages>
    </>
  );
}

export default page;
