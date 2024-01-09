import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { useTranslations, useLocale } from "next-intl";
import FormPhone from "@/app/[locale]/components/admin/phone/PhoneForm";
import BasePages from "@/app/[locale]/components/common/BasePages";
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
     <BasePages title={`${t("Common.create")} ${t("Account.phone")}`}>
        <FormPhone locale={locale} isCreate={true} isEdit={false} />
     </BasePages>
    </>
  );
}

export default page;
