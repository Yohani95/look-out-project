import React from 'react';
import { getLocale } from 'next-intl/server';
import ProfesionalProyectoDesarrolloSearch from '@/app/[locale]/components/proyectoDesarrollo/profesional/ProfesionalProyectoDesarrolloSearch';
import { getAllProfesionalProyectoDesarrolloByIdProyecto } from '@/app/actions/proyectoDesarrollo/ProfesionalProyectoDesarrolloActions';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);

  // Obtener los profesionales asignados al proyecto de desarrollo
  const data = await GetData(params.id);

  return (
    <ProfesionalProyectoDesarrolloSearch
      t={t}
      data={data.profesionales}
      idProyectoDesarrollo={params.id}
    />
  );
}

const GetData = async (id: number) => {
  try {
    const profesionales = await getAllProfesionalProyectoDesarrolloByIdProyecto(
      id
    );
    return {
      profesionales,
    };
  } catch (error) {
    console.error(
      'Error al obtener los datos de profesionales del proyecto de desarrollo:',
      error
    );
    throw error;
  }
};

export default page;
