import React from 'react'
import VentaLicenciaSearch from '../../components/licencia/VentaLicenciaSearch'
import { useLocale } from 'next-intl';
import BasePages from "@/app/[locale]/components/common/BasePages";
import { getAllVentaLicencia } from '@/app/actions/licencia/VentaLicenciaActions';
async function page() {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data= await getAllVentaLicencia();
  return (
    <BasePages title={t.Common.licenses}>
    <VentaLicenciaSearch t={t} data={data}/>
    </BasePages>
  )
}

export default page