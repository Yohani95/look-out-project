import React from "react";
import { useTranslations, useLocale } from "next-intl";
import FormContact from "@/app/[locale]/components/contact/FormContact";
import BasePages from "@/app/[locale]/components/common/BasePages";
function page({ params }) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <BasePages title={t("Nav.contacts.create")}>
      <FormContact locale={locale} isEdit={false} isCreate={true} />
    </BasePages>
  );
}

export default page;
