import React from 'react';
import { getLocale } from 'next-intl/server';
import Persona from '@/app/api/models/admin/Persona';
import ProfesionalProyectoDesarrolloCreate from '@/app/[locale]/components/proyectoDesarrollo/profesional/ProfesionalProyectoDesarrolloCreate';
import { getAllPersona } from '@/app/actions/admin/PersonaActions';
import ProfesionalProyectoDesarrolloEdit from '@/app/[locale]/components/proyectoDesarrollo/profesional/ProfesionalProyectoDesarrolloEdit';
import { getProfesionalProyectoDesarrolloById } from '@/app/actions/proyectoDesarrollo/ProfesionalProyectoDesarrolloActions';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.idProfesional);
  return <ProfesionalProyectoDesarrolloEdit data={data} t={t} id={params.id} />;
}

const GetData = async (id: number) => {
  try {
    const personas = await getAllPersona();
    const profesionalProyectoDesarrollo =
      await getProfesionalProyectoDesarrolloById(id);
    const mappedPersonas = personas.map((persona) => {
      return new Persona(persona).getSelectOptions();
    });

    return {
      personas: mappedPersonas,
      profesionalProyectoDesarrollo,
    };
  } catch (error) {
    console.error(
      'Error al obtener los datos de profesionales y proyectos:',
      error
    );
    throw error;
  }
};

export default page;
