import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { useTranslations } from 'next-intl';
import UnderLineNavProyectoDesarrollo from '../../components/proyectoDesarrollo/common/UnderLineNavProyectoDesarrollo';
import { Separator } from '@/components/ui/separator';

function layout({ params, children }) {
  const t = useTranslations();
  return (
    <>
      <BasePages title={t('Common.project')}>
        <div className="flex flex-col items-center w-full">
          <UnderLineNavProyectoDesarrollo id={params.id} />
          <Separator className="my-4 w-11/12 max-w-[900px] border border-gray-400" />
        </div>
        <div>{children}</div>
      </BasePages>
    </>
  );
}

export default layout;
