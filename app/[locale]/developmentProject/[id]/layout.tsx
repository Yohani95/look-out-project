import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { useTranslations } from 'next-intl';
import UnderLineNavProyectoDesarrollo from '../../components/proyectoDesarrollo/common/UnderLineNavProyectoDesarrollo';
function layout({ params, children }) {
  const t = useTranslations();
  return (
    <>
      <BasePages title={t('Common.project')}>
        <UnderLineNavProyectoDesarrollo id={params.id} />
        <div>{children}</div>
      </BasePages>
    </>
  );
}

export default layout;
