import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import UserListClient from '@/app/[locale]/components/admin/user/UserListClient';
import BasePages from '@/app/[locale]/components/common/BasePages';
function page() {
  const t = useTranslations();
  const locale = useLocale();
  const traslations = {
    table: {
      username: t('user.userName'),
      password: t('Common.password'),
      idPerson: t('user.idPerson'),
      idProfile: t('user.idProfile'),
      active: t('user.active'),
    },
    search: t('Account.table.search'),
    title: t('Nav.administration.user'),
    noResultsFound: t('Common.noResultsFound'),
    loadingData: t('Common.loadingData'),
    errorMsg: t('Common.errorOccurred'),
  };
  return (
    <>
      <BasePages title={t('Nav.administration.userList')}>
        <UserListClient traslations={traslations} locale={locale} />
      </BasePages>
    </>
  );
}

export default page;
