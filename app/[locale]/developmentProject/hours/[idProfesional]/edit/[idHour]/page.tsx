import React from 'react';
import { getLocale } from 'next-intl/server';
import { getAllProfesionalProyectoDesarrolloByIdProyecto } from '@/app/actions/proyectoDesarrollo/ProfesionalProyectoDesarrolloActions';
import ProfesionalProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProfesionalProyectoDesarrollo';
import RegistroHorasProyectoDesarrolloCreate from '@/app/[locale]/components/proyectoDesarrollo/profesional/RegistroHorasProyectoDesarrolloCreate';
import BasePages from '@/app/[locale]/components/common/BasePages';
import RegistroHorasProyectoDesarrolloEdit from '@/app/[locale]/components/proyectoDesarrollo/profesional/RegistroHorasProyectoDesarrolloEdit';
import { getRegistroHorasProyectoDesarrolloById } from '@/app/actions/proyectoDesarrollo/RegistroHorasProyectoDesarrolloActions';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.idHour);
  return (
    <BasePages title={t.Common.hour}>
      <RegistroHorasProyectoDesarrolloEdit data={data} t={t} id={params.id} />
    </BasePages>
  );
}
const GetData = async (idHour: number) => {
  try {
    const registroHora = await getRegistroHorasProyectoDesarrolloById(idHour);
    return {
      registroHora,
    };
  } catch (error) {
    console.error(
      'Error al obtener los datos de profesionales asignados:',
      error
    );
    throw error;
  }
};
export default page;
