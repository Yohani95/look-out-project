import LogSearch from '@/app/[locale]/components/log/LogSearch';
import { getAllLog } from '@/app/actions/log/LogActions';
import { useLocale } from 'next-intl';
import React from 'react'
import BasePages from "@/app/[locale]/components/common/BasePages";
async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await getAllLog();
  return (
    <BasePages title="Logs">
      <LogSearch t={t} data={data} />
    </BasePages>
  )
}

export default page