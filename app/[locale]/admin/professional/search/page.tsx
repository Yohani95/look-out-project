import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import ProfessionalsSearch from '@/app/[locale]/components/admin/professionals/ProfessionalsSearch';
import Link from 'next/link';
import { fetchAllProfessionals } from '@/app/[locale]/utils/person/PersonActions';
async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const personas = await fetchAllProfessionals();
  return (
    <BasePages title={`${t.Common.professionals}`} additionalContent={''}>
      <div className="d-flex justify-content-end container mb-3">
        <Link href={'/admin/professional/create'}>
          <button type="button" className=" btn btn-primary ">
            + {t.Account.add} {t.Common.professionals}
          </button>
        </Link>
      </div>
      <ProfessionalsSearch locale={locale} data={personas} />
    </BasePages>
  );
}
export default page;
