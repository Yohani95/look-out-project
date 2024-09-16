import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { useTranslations } from 'next-intl';
import UnderLineNavLicencia from '../../../components/licencia/UnderLineNavLicencia';
function layout({ params, children }) {
  const t = useTranslations('Opportunity');
  return (
    <>
      <BasePages title={t('opportunity')}>
        <UnderLineNavLicencia id={params.id} />
        <div>{children}</div>
      </BasePages>
    </>
  );
}

export default layout;
