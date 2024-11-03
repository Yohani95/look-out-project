import React from 'react';
import { getLocale } from 'next-intl/server';
import EtapaProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/EtapaProyectoDesarrollo';
import { getPlanificacionProyectoDesarrolloById } from '@/app/actions/proyectoDesarrollo/PlanificacionProyectoDesarrolloActions';
import { getAllEtapaProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/EtapaProyectoDesarrolloActions';
import PlanificacionProyectoDesarrolloEdit from '@/app/[locale]/components/proyectoDesarrollo/planification/PlanificacionProyectoDesarrolloEdit';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id_planificacion);
  return (
    <PlanificacionProyectoDesarrolloEdit
      data={data}
      t={t}
      id={params.id_planificacion}
    />
  );
}

const GetData = async (id: number) => {
  try {
    const [etapas, planificacionProyectoDesarrollo] = await Promise.all([
      getAllEtapaProyectoDesarrollo(),
      getPlanificacionProyectoDesarrolloById(id),
    ]);

    const mappedEtapas = etapas.map((etapa) => {
      return new EtapaProyectoDesarrollo(etapa).getSelectOptions();
    });

    return {
      etapas: mappedEtapas,
      planificacionProyectoDesarrollo,
    };
  } catch (error) {
    console.error(
      'Error al obtener los datos de planificación de proyecto:',
      error
    );
    throw error;
  }
};

export default page;
