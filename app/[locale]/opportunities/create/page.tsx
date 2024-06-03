import React from 'react'
import BasePages from "@/app/[locale]/components/common/BasePages";
import { useLocale } from 'next-intl';
import OportunidadCreate from '../../components/oportunidad/OportunidadCreate';
function page() {
    const locale = useLocale();
    const t = require(`@/messages/${locale}.json`);
    return (
        <BasePages title={t.Opportunity.opportunity}>
          <OportunidadCreate data={[]} t={t}/>
        </BasePages>
    )
}

export default page