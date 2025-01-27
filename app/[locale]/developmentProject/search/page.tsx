import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import ProyectoDesarrolloSearch from '../../components/proyectoDesarrollo/ProyectoDesarrolloSearch';
import { getAllProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/ProyectoDesarrolloActions';
import { getAllEtapaProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/EtapaProyectoDesarrolloActions';

async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);

  // Obtener los proyectos de desarrollo y cualquier dato adicional necesario
  const data = await GetData();
  return (
    <BasePages title={t.Common.project}>
      <ProyectoDesarrolloSearch
        t={t}
        data={data.proyectos}
        listaEtapa={data.etapas}
      />
    </BasePages>
  );
}
const GetData = async () => {
  try {
    // Obtén los proyectos directamente sin modificar su estructura

    const proyectos = await getAllProyectoDesarrollo();
    const etapas = await getAllEtapaProyectoDesarrollo();
    return {
      proyectos,
      etapas,
    };
  } catch (error) {
    console.error(
      'Error al obtener los datos de proyectos de desarrollo:',
      error
    );
    throw error;
  }
};
export default page;
