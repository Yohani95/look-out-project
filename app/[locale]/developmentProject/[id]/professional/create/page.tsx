import React from 'react';
import { getLocale } from 'next-intl/server';
import { getAllProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/ProyectoDesarrolloActions';
import Persona from '@/app/api/models/admin/Persona';
import ProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProyectoDesarrollo';
import ProfesionalProyectoDesarrolloCreate from '@/app/[locale]/components/proyectoDesarrollo/profesional/ProfesionalProyectoDesarrolloCreate';
import { getAllPersona } from '@/app/actions/admin/PersonaActions';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  return (
    <ProfesionalProyectoDesarrolloCreate
      data={data}
      t={t}
      idProyectoDesarrollo={params.id}
    />
  );
}

const GetData = async () => {
  try {
    const personas = await getAllPersona();
    const proyectos = await getAllProyectoDesarrollo();

    const mappedPersonas = personas.map((persona) => {
      return new Persona(persona).getSelectOptions();
    });

    const mappedProyectos = proyectos.map((proyecto) => {
      return new ProyectoDesarrollo(proyecto).getSelectOptions();
    });

    return {
      personas: mappedPersonas,
      proyectos: mappedProyectos,
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
