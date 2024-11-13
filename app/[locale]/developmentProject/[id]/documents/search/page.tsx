import React from 'react';
import { getLocale } from 'next-intl/server';
import DocumentoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/DocumentoProyectoDesarrollo';
import DocumentoProyectoDesarrolloSearch from '@/app/[locale]/components/proyectoDesarrollo/DocumentoProyectoDesarrollo/DocumentoProyectoDesarrolloSearch';
import { getAllDocumentoProyectoDesarrolloById } from '@/app/actions/proyectoDesarrollo/DocumentoProyectoDesarrolloActions';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await getAllDocumentoProyectoDesarrolloById(params.id);
  return (
    <DocumentoProyectoDesarrolloSearch
      t={t}
      data={data}
      idProyectoDesarrollo={params.id}
    />
  );
}
export default page;
