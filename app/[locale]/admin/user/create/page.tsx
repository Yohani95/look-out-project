import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import UserForm from '@/app/[locale]/components/admin/user/UserForm';
import BasePages from '@/app/[locale]/components/common/BasePages';
function page({ params }) {
  const t = useTranslations('Nav.administration');
  const locale = useLocale();
  return (
    <>
      <BasePages title={t('createUser')}>
        <UserForm locale={locale} isEdit={false} />
      </BasePages>
    </>
  );
}

export default page;
