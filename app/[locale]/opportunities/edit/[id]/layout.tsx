import React from 'react'
import UnderLineNav from '../../../components/oportunidad/UnderLineNav'
import BasePages from "@/app/[locale]/components/common/BasePages";
import { useTranslations } from 'next-intl';
function layout({ params,children }) {
    const t= useTranslations("Opportunity");
    return (
        <>
            <BasePages title={t('opportunity')}>
                <UnderLineNav id={params.id}/>
                <div>{children}</div>
            </BasePages>

        </>
    )
}

export default layout