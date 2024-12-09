import React from 'react';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import ListPerfil from '@/app/[locale]/components/admin/perfil/ListPerfil';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import BasePages from '@/app/[locale]/components/common/BasePages';
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <BasePages
        title={t('Common.perfil')}
        actionButton={
          <Link href={'/admin/perfil/create'}>
            <button type="button" className=" btn btn-primary ">
              + {t('Account.add')} {t('Common.perfil')}
            </button>
          </Link>
        }
      >
        <ListPerfil locale={locale} />
      </BasePages>
    </>
  );
}

export default page;
