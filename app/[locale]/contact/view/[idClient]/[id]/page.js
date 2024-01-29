import React from "react";
import { useTranslations, useLocale } from "next-intl";
import FormContact from "@/app/[locale]/components/contact/FormContact";
import BasePages from "@/app/[locale]/components/common/BasePages";
function page({ params }) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <BasePages title={t("Nav.contacts.edit")}>
      <FormContact
        locale={locale}
        isEdit={false}
        isCreate={false}
        idPerson={params.id}
        idClient={params.idClient}
      />
    </BasePages>
  );
}

export default page;
