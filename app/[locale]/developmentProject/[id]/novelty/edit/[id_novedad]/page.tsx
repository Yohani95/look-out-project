import React from 'react';
import { getLocale } from 'next-intl/server';
import { getAllTipoNovedadProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/TipoNovedadProyectoDesarrolloActions';
import TipoNovedadProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/TipoNovedadProyectoDesarrollo';
import { getNovedadProyectoDesarrolloById } from '@/app/actions/proyectoDesarrollo/NovedadesProyectoDesarrolloActions';
import NovedadProyectoDesarrolloEdit from '@/app/[locale]/components/proyectoDesarrollo/novedades/NovedadProyectoDesarrolloEdit';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id_novedad);
  return (
    <NovedadProyectoDesarrolloEdit data={data} t={t} id={params.id_novedad} />
  );
}

const GetData = async (id: number) => {
  try {
    const [tiposNovedad, novedadProyectoDesarrollo] = await Promise.all([
      getAllTipoNovedadProyectoDesarrollo(),
      getNovedadProyectoDesarrolloById(id),
    ]);

    const mappedTiposNovedad = tiposNovedad.map((tipo) => {
      return new TipoNovedadProyectoDesarrollo(tipo).getSelectOptions();
    });

    return {
      tiposNovedad: mappedTiposNovedad,
      novedadProyectoDesarrollo,
    };
  } catch (error) {
    console.error('Error al obtener los datos de novedad de proyecto:', error);
    throw error;
  }
};

export default page;
