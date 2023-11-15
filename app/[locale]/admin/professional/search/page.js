import React from "react";
import BasePages from "@/app/[locale]/components/common/BasePages";
import { useTranslations, useLocale } from "next-intl";
import ProfessionalsSearch from "@/app/[locale]/components/admin/professionals/ProfessionalsSearch";
import Link from "next/link";
import { fetchAllPerson } from "@/app/[locale]/utils/person/UtilsPerson";
async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const personas =await fetchAllPerson();
  return (
    <BasePages title={`${t.Common.professionals}`}>
      <div className="d-flex justify-content-end container mb-3">
        <Link href={"/admin/professional/create"}>
          <button type="button" className=" btn btn-primary ">
            + {t.Account.add} {t.Common.professionals}
          </button>
        </Link>
      </div>
      <ProfessionalsSearch locale={locale} data={personas}/>
    </BasePages>
  );
}
export default page;
