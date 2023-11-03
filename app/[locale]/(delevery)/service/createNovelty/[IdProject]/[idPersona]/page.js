import React from "react";
import { useTranslations, useLocale } from "next-intl";
import FormNovelty from "@/app/[locale]/components/business/Services/FormNovelty";
import BasePages from "@/app/[locale]/components/common/BasePages";
function page({ params }) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <BasePages title={t("Nav.services.createNovelty")}>
        <FormNovelty
          locale={locale}
          idPersona={params.idPersona}
          idProyecto={params.IdProject}
        />
      </BasePages>
    </>
  );
}

export default page;
