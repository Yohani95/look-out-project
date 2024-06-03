import React from 'react'
import BasePages from "@/app/[locale]/components/common/BasePages";
import { useLocale } from 'next-intl';
import OportunidadSearch from '../../components/oportunidad/OportunidadSearch';
function page() {
    const locale = useLocale();
    const t = require(`@/messages/${locale}.json`);
    return (
        <BasePages title={t.Opportunity.opportunities}>
            <OportunidadSearch t={t} data={[]} />
        </BasePages>
    )
}

export default page