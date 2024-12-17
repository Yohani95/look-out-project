import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import ListEmail from '@/app/[locale]/components/admin/email/ListEmail';
import Link from 'next/link';
import BasePages from '@/app/[locale]/components/common/BasePages';
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <BasePages
        actionButton={
          <Link href={'/admin/email/create'}>
            <button type="button" className=" btn btn-primary ">
              + {t('Account.add')} {t('Common.email')}
            </button>
          </Link>
        }
        title={t('Common.email')}
      >
        <ListEmail locale={locale} />
      </BasePages>
    </>
  );
}

export default page;
