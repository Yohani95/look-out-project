import React from 'react';
import UnderLineNav from '../../../components/oportunidad/UnderLineNav';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
function layout({ params, children }) {
  const t = useTranslations();
  return (
    <>
      <BasePages
        title={t('Opportunity.opportunity')}
        description={t('Opportunity.descriptionEdit')}
        actionButton={
          <>
            <Link href="/contact/create" passHref legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <button type="button" className="btn btn-secondary ml-2">
                  {t('Common.contact')}
                </button>
              </a>
            </Link>
          </>
        }
      >
        <UnderLineNav id={params.id} />
        <div>{children}</div>
      </BasePages>
    </>
  );
}

export default layout;
