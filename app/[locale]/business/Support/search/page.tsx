import React from 'react'
import BasePages from "@/app/[locale]/components/common/BasePages";
import { useLocale } from 'next-intl';
import ListSupport from '@/app/[locale]/components/support/ListSupport';
import { GetAllEntitiesSoporte } from '@/app/api/actions/soporte/SoporteActions';
import Soporte from '@/app/api/models/support/Soporte';

async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const soportes= await GetAllEntitiesSoporte() as Soporte[];
  return (
    <BasePages title={t.Common.supports}>
        <ListSupport t={t} data={soportes}/>
    </BasePages>
  )
}

export default page