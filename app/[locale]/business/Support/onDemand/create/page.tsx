import React from 'react'
import BasePages from "@/app/[locale]/components/common/BasePages";
import { useLocale } from 'next-intl';
function page() {
    const locale = useLocale();
    const t = require(`@/messages/${locale}.json`);
  return (
    <BasePages >
    </BasePages>
  )
}

export default page