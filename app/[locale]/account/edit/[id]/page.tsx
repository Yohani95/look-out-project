import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Form from '@/app/[locale]/components/account/Form';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import BasePages from '@/app/[locale]/components/common/BasePages';
function page({ params }) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <BasePages title={t('Common.edit')}>
        <Form locale={locale} isEdit={true} idPerson={params.id} />
      </BasePages>
    </>
  );
}

export default page;
