import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import ListAddress from '@/app/[locale]/components/world/address/ListAddress';
import Link from 'next/link';
import BasePages from '@/app/[locale]/components/common/BasePages';
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <BasePages
        title={t('Nav.administration.userList')}
        actionButton={
          <Link href={'/contact/address/create'}>
            <button type="button" className=" btn btn-primary ">
              {t('Account.add')} {t('Common.address')}
            </button>
          </Link>
        }
      >
        <ListAddress locale={locale} />
      </BasePages>
    </>
  );
}

export default page;
