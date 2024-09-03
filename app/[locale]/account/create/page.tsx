import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Form from '@/app/[locale]/components/account/Form';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import BasePages from '@/app/[locale]/components/common/BasePages';
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <BasePages title={t('Account.title')}>
      <Form locale={locale} isEdit={false} isCreate={true} />
    </BasePages>
  );
}

export default page;
