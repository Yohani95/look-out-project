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
      <BasePages title={`${t("Common.edit")} ${t("Common.email")}`}>
        <FormEmail
          locale={locale}
          isCreate={false}
          isEdit={true}
          idEmail={params.id}
        />
      </BasePages>
    </>
  );
}

export default page;
