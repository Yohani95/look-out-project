import React from 'react'
import BasePages from "@/app/[locale]/components/common/BasePages";
import { useLocale } from 'next-intl';
import ListSupport from '@/app/[locale]/components/support/ListSupport';
import { GetAllEntetiesProyecto } from '@/app/api/actions/proyecto/ProyectoActions';
import Proyecto from '@/app/api/models/proyecto/Proyecto';

async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const proyectos= await GetAllEntetiesProyecto() as Proyecto[];
  return (
    <BasePages title={t.Common.supports}>
        <ListSupport t={t} data={proyectos}/>
    </BasePages>
  )
}

export default page