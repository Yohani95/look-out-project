import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import List from '@/app/[locale]/components/account/List';
import Link from 'next/link';
import TableMaterialUI from '../../components/common/TablaMaterialUi';
import BasePages from '../../components/common/BasePages';
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <BasePages title={t('Common.accounts')}>
        <h4 className="mb-3">{t('Common.accounts')}</h4>
        <div className="d-flex justify-content-end mb-3">
          <Link href={'/account/relations'}>
            <button type="button" className="btn btn-secondary me-2">
              {t('Ficha.button.see_relations')}
            </button>
          </Link>
          <Link href={'/account/create'}>
            <button type="button" className="btn btn-primary me-2">
              + {t('Account.new')} {t('Account.account')}
            </button>
          </Link>
        </div>
        <List locale={locale} />
      </BasePages>
    </>
  );
}

export default page;
