import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import ListPhone from '@/app/[locale]/components/admin/phone/ListPhone';
import Link from 'next/link';
import BasePages from '@/app/[locale]/components/common/BasePages';
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <BasePages
        title={t('Common.phone')}
        actionButton={
          <Link href={'/admin/phone/create'}>
            <button type="button" className=" btn btn-primary ">
              + {t('Account.add')} {t('Common.phone')}
            </button>
          </Link>
        }
      >
        <ListPhone locale={locale} />
      </BasePages>
    </>
  );
}

export default page;
