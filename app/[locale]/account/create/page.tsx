import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import BasePages from '@/app/[locale]/components/common/BasePages';
import Form from '../../components/account/Form';
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <BasePages
      title={t('Account.title')}
      description={t('Account.descriptionPages.create')}
    >
      <Form locale={locale} isEdit={false} isCreate={true} />
    </BasePages>
  );
}

export default page;
