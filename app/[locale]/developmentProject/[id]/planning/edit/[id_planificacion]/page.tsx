import React from 'react';
import { getLocale } from 'next-intl/server';
import {
  getPlanificacionProyectoDesarrolloById,
  PlanificacionGetAllByIdProyecto,
} from '@/app/actions/proyectoDesarrollo/PlanificacionProyectoDesarrolloActions';
import PlanificacionProyectoDesarrolloEdit from '@/app/[locale]/components/proyectoDesarrollo/planification/PlanificacionProyectoDesarrolloEdit';
import { getAllEtapaPlanificacionProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/EtapaPlanificacionProyectoDesarrolloActions';
import EtapaPlanificacionProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/EtapaPlanificacionProyectoDesarrollo';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id_planificacion, params.id);
  return (
    <PlanificacionProyectoDesarrolloEdit
      data={data}
      t={t}
      id={params.id_planificacion}
    />
  );
}

const GetData = async (id: number, idproyecto) => {
  try {
    const [etapas, planificacionProyectoDesarrollo] = await Promise.all([
      getAllEtapaPlanificacionProyectoDesarrollo(),
      getPlanificacionProyectoDesarrolloById(id),
    ]);

    const mappedEtapas = etapas.map((etapa) => {
      return new EtapaPlanificacionProyectoDesarrollo(etapa).getSelectOptions();
    });
    const planificaciones = await PlanificacionGetAllByIdProyecto(idproyecto);
    return {
      etapasExistente: planificaciones,
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
