import React from 'react'
import BasePages from "@/app/[locale]/components/common/BasePages";
import { useLocale } from 'next-intl';
import ListSupport from '@/app/[locale]/components/support/ListSupport';
import { GetAllEntitiesByIdTipoSoporteApiUrl } from '@/app/api/apiConfig';
import { Constantes } from '@/app/api/models/common/Constantes';
import { GetAllEntitiesByIdTipoSoporte } from '@/app/api/actions/soporte/SoporteActions';
import Soporte from '@/app/api/models/support/Soporte';
async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const soportes= await GetAllEntitiesByIdTipoSoporte(Constantes.TipoSorpote.BOLSA) as Soporte[];
  return (
    <BasePages title={t.support.bagholder}>
        <ListSupport t={t} data={soportes} tipo={Constantes.TipoSorpote.BOLSA}/>
    </BasePages>
  )
}

export default page