import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import { getAllTipoNovedadProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/TipoNovedadProyectoDesarrolloActions';
import TipoNovedadProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/TipoNovedadProyectoDesarrollo';
import NovedadProyectoDesarrolloCreate from '@/app/[locale]/components/proyectoDesarrollo/novedades/NovedadProyectoDesarrolloCreate';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  return (
    <NovedadProyectoDesarrolloCreate
      data={data}
      t={t}
      idProyectoDesarrollo={params.id}
    />
  );
}

const GetData = async () => {
  try {
    const tiposNovedad = await getAllTipoNovedadProyectoDesarrollo();

    const mappedTiposNovedad = tiposNovedad.map((tipo) => {
      return new TipoNovedadProyectoDesarrollo(tipo).getSelectOptions();
    });

    return {
      tiposNovedad: mappedTiposNovedad,
    };
  } catch (error) {
    console.error('Error al obtener los datos de tipos de novedad:', error);
    throw error;
  }
};

export default page;
