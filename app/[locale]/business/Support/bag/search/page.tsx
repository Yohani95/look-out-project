import React from 'react'
import BasePages from "@/app/[locale]/components/common/BasePages";
import { useLocale } from 'next-intl';
import ListSupport from '@/app/[locale]/components/support/ListSupport';
async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  //const soportes= await GetAllEntitiesSoporte() as Soporte[];
  return (
    <BasePages title={t.support.bagholder}>
        <ListSupport t={t} data={[]}/>
    </BasePages>
  )
}

export default page