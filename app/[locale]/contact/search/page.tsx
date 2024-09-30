import React from 'react';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import { useTranslations, useLocale } from 'next-intl';
import ContactSearch from '@/app/[locale]/components/contact/ContactSearch';
import Link from 'next/link';
import BasePages from '../../components/common/BasePages';
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <BasePages
        title={`${t('Common.search')} ${t('Account.table.contacts.title')}`}
      >
        <h4 className="mb-3">{t('Account.table.contacts.title')}</h4>
        <div className="d-flex justify-content-end container mb-3">
          <Link href={'/contact/create'}>
            <button type="button" className=" btn btn-primary ">
              + {t('Account.add')} {t('Account.table.contacts.title')}
            </button>
          </Link>
        </div>
        <ContactSearch locale={locale} />
      </BasePages>
    </>
  );
}

export default page;
