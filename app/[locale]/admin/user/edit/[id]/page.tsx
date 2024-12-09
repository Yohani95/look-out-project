import React from 'react';
import { useTranslations } from 'next-intl';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import UserForm from '@/app/[locale]/components/admin/user/UserForm';
import BasePages from '@/app/[locale]/components/common/BasePages';
function page({ params }) {
  const t = useTranslations('Nav.administration');
  return (
    <>
      <BasePages title={t('editUser')}>
        <UserForm locale={params.locale} isEdit={true} id={params.id} />
      </BasePages>
    </>
  );
}

export default page;
