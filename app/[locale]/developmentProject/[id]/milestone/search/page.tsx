import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import {
  getAllHitoProyectoDesarrollo,
  HitoGetAllByIdProyecto,
} from '@/app/actions/proyectoDesarrollo/HitoProyectoDesarrolloActions';
import HitoProyectoDesarrolloSearch from '@/app/[locale]/components/proyectoDesarrollo/milestone/HitoProyectoDesarrolloSearch';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);

  // Obtener los hitos de proyectos de desarrollo y cualquier dato adicional necesario
  const data = await GetData(params.id);
  return (
    <HitoProyectoDesarrolloSearch
      t={t}
      data={data.hitos}
      idProyectoDesarrollo={params.id}
    />
  );
}

const GetData = async (id: number) => {
  try {
    // Obtén los hitos de proyecto directamente sin modificar su estructura
    const hitos = await HitoGetAllByIdProyecto(id);
    return {
      hitos,
    };
  } catch (error) {
    console.error(
      'Error al obtener los datos de hitos de proyecto de desarrollo:',
      error
    );
    throw error;
  }
};

export default page;
