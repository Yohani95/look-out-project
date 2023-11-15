import React from "react";
import BasePages from "@/app/[locale]/components/common/BasePages";
import { useTranslations, useLocale } from "next-intl";
import ProfessionalsCreate from "@/app/[locale]/components/admin/professionals/ProfessionalsCreate";
import fetchCountriest from "@/app/[locale]/utils/country/Countrylist";
async function page() {
  const data = await fetchCountriest().then((pais) => {
    const options = pais.map((country) => ({
      value: country.paiId,
      label: country.paiNombre,
    }));
    return options;
  });
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <BasePages title={`${t.Common.create} ${t.Common.professionals}`}>
      <ProfessionalsCreate locale={locale} data={data} />
    </BasePages>
  );
}

export default page;
