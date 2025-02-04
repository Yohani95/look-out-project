import React from 'react';
import { getLocale } from 'next-intl/server';
import RegistroHorasProyectoDesarrolloSearch from '@/app/[locale]/components/proyectoDesarrollo/profesional/RegistroHorasProyectoDesarrolloSearch';
import { getAllRegistroHorasByIdProfesionalProyecto } from '@/app/actions/proyectoDesarrollo/RegistroHorasProyectoDesarrolloActions';
import BasePages from '@/app/[locale]/components/common/BasePages';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);

  // Obtener los registros de horas trabajadas del profesional en el proyecto
  const data = await GetData(params.idProfesional);
  return (
    <BasePages title={t.Common.hour}>
      <RegistroHorasProyectoDesarrolloSearch
        t={t}
        data={data.registros}
        idProfesionalProyecto={params.idProfesional}
      />
    </BasePages>
  );
}

const GetData = async (id: number) => {
  try {
    const registros = await getAllRegistroHorasByIdProfesionalProyecto(id);
    return {
      registros,
    };
  } catch (error) {
    console.error(
      'Error al obtener los datos de registro de horas del profesional en el proyecto:',
      error
    );
    throw error;
  }
};

export default page;
