import DocumentoProyectoDesarrolloCreate from '@/app/[locale]/components/proyectoDesarrollo/DocumentoProyectoDesarrollo/DocumentoProyectoDesarrolloCreate';
import { useLocale } from 'next-intl';
import React from 'react';

function page({ params }) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <>
      <DocumentoProyectoDesarrolloCreate
        t={t}
        idProyectoDesarrollo={params.id}
      />
    </>
  );
}

export default page;
