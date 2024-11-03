import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import { PlanificacionGetAllByIdProyecto } from '@/app/actions/proyectoDesarrollo/PlanificacionProyectoDesarrolloActions';
import PlanificacionProyectoDesarrolloSearch from '@/app/[locale]/components/proyectoDesarrollo/planification/PlanificacionProyectoDesarrolloSearch';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);

  // Obtener las planificaciones de proyectos de desarrollo y cualquier dato adicional necesario
  const data = await GetData(params.id);
  return (
    <PlanificacionProyectoDesarrolloSearch
      t={t}
      data={data.planificaciones}
      idProyectoDesarrollo={params.id}
    />
  );
}

const GetData = async (id: number) => {
  try {
    // Obtén las planificaciones de proyecto directamente sin modificar su estructura
    const planificaciones = await PlanificacionGetAllByIdProyecto(id);
    return {
      planificaciones,
    };
  } catch (error) {
    console.error(
      'Error al obtener los datos de planificaciones de proyecto de desarrollo:',
      error
    );
    throw error;
  }
};

export default page;
