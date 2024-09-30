import React from 'react';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import { useTranslations, useLocale } from 'next-intl';
import ListService from '@/app/[locale]/components/business/Services/ListService';
import Link from 'next/link';
import BasePages from '@/app/[locale]/components/common/BasePages';
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <BasePages title={`${t('Nav.business.insertServices')}`}>
        <h4 className="mb-3">{t('Common.services')}</h4>
        <div className="d-flex justify-content-end container mb-3">
          <Link href={'/business/closeServices/create'}>
            <button type="button" className=" btn btn-primary ">
              + {t('Account.add')} {t('Common.services')}
            </button>
          </Link>
        </div>
        <ListService locale={locale} />
      </BasePages>
    </>
  );
}

export default page;
