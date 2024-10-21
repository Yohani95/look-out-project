import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import { NovedadGetAllByIdProyecto } from '@/app/actions/proyectoDesarrollo/NovedadesProyectoDesarrolloActions';
import NovedadProyectoDesarrolloSearch from '@/app/[locale]/components/proyectoDesarrollo/novedades/NovedadProyectoDesarrolloSearch';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);

  // Obtener las novedades de proyectos de desarrollo y cualquier dato adicional necesario
  const data = await GetData(params.id);
  return (
    <NovedadProyectoDesarrolloSearch
      t={t}
      data={data.novedades}
      idProyectoDesarrollo={params.id}
    />
  );
}

const GetData = async (id: number) => {
  try {
    // Obtén las novedades de proyecto directamente sin modificar su estructura
    const novedades = await NovedadGetAllByIdProyecto(id);
    return {
      novedades,
    };
  } catch (error) {
    console.error(
      'Error al obtener los datos de novedades de proyecto de desarrollo:',
      error
    );
    throw error;
  }
};

export default page;
