import DocumentoProyectoDesarrolloEdit from '@/app/[locale]/components/proyectoDesarrollo/DocumentoProyectoDesarrollo/DocumentoProyectoDesarrolloEdit';
import { getDocumentoProyectoDesarrolloById } from '@/app/actions/proyectoDesarrollo/DocumentoProyectoDesarrolloActions';
import { getLocale } from 'next-intl/server';
import React from 'react';

async function page({ params }) {
  const documento = await getDocumentoProyectoDesarrolloById(
    params.id_documento
  );
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <>
      <DocumentoProyectoDesarrolloEdit
        documento={documento}
        idProyectoDesarrollo={params.id}
        t={t}
      />
    </>
  );
}

export default page;
