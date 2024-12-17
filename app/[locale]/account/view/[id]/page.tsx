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
      <BasePages title={t('Common.account')}>
        <Form
          locale={locale}
          isEdit={false}
          isCreate={false}
          idPerson={params.id}
        />
      </BasePages>
    </>
  );
}

export default page;
