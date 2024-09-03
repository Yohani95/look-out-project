import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import FormNovelty from '@/app/[locale]/components/business/Services/FormNovelty';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { fetchData } from '@/app/[locale]/utils/Form/UtilsForm';
import { novedadApiUrl, novedadWithEntetiesApiUrl } from '@/app/api/apiConfig';
import NovedadEdit from '@/app/[locale]/components/business/Services/novedades/NovedadEdit';
async function page({ params }) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const novedad = await fetchData(`${novedadApiUrl}/${params.id}`);
  return (
    <>
      <BasePages title={t.Nav.services.editNovelty}>
        <NovedadEdit t={t} novedad={novedad} params={params} />
      </BasePages>
    </>
  );
}

export default page;
