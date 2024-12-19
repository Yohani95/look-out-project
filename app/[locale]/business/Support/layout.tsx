import React from 'react';
import BasePages from '../../components/common/BasePages';
import { getLocale } from 'next-intl/server';
import SubNavSupport from '../../components/support/Common/SubNavSupport';
async function layout({ children }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <>
      <BasePages
        title={t.Common.supports}
        description={t.support.supportDescription}
      >
        <SubNavSupport />
        {children}
      </BasePages>
    </>
  );
}
export default layout;
