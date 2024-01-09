import React from "react";
import { useTranslations, useLocale } from "next-intl";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import FormPhone from "@/app/[locale]/components/admin/phone/PhoneForm";
import BasePages from "@/app/[locale]/components/common/BasePages";
function page({params}) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
     <BasePages title={`${t("Account.phone")}`}>
     <FormPhone locale={locale} isEdit={false} isCreate={false} idPhone={params.id}/>
     </BasePages>
    </>
  );
}

export default page;
