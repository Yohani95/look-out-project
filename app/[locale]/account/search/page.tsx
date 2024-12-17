import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import List from '@/app/[locale]/components/account/List';
import BasePages from '../../components/common/BasePages';
import { Button } from '@/components/ui/button';

function Page() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <BasePages
      title={t('Common.accounts')}
      description={t('Account.descriptionPages.search')}
      actionButton={
        <>
          {/* <Link href={'/account/relations'}>
            <button type="button" className="btn btn-secondary me-2">
              {t('Ficha.button.see_relations')}
            </button>
          </Link> */}
          <Link href={'/account/create'}>
            <button type="button" className="btn btn-primary me-2">
              {t('Common.add')} {t('Account.account')}
            </button>
          </Link>
        </>
      }
    >
      <List locale={locale} />
    </BasePages>
  );
}

export default Page;
