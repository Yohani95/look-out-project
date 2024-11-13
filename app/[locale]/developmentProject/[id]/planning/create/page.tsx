import React from 'react';
import { getLocale } from 'next-intl/server';
import PlanificacionProyectoDesarrolloCreate from '@/app/[locale]/components/proyectoDesarrollo/planification/PlanificacionProyectoDesarrolloCreate';
import { getAllEtapaPlanificacionProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/EtapaPlanificacionProyectoDesarrolloActions';
import EtapaPlanificacionProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/EtapaPlanificacionProyectoDesarrollo';
import { PlanificacionGetAllByIdProyecto } from '@/app/actions/proyectoDesarrollo/PlanificacionProyectoDesarrolloActions';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id);
  return (
    <PlanificacionProyectoDesarrolloCreate
      data={data}
      t={t}
      idProyectoDesarrollo={params.id}
    />
  );
}

const GetData = async (id) => {
  try {
    const etapas = await getAllEtapaPlanificacionProyectoDesarrollo();

    const mappedEtapas = etapas.map((etapa) => {
      return new EtapaPlanificacionProyectoDesarrollo(etapa).getSelectOptions();
    });
    const planificaciones = await PlanificacionGetAllByIdProyecto(id);
    return {
      etapasExistente: planificaciones,
      etapas: mappedEtapas,
    };
  } catch (error) {
    console.error('Error al obtener los datos de etapas:', error);
    throw error;
  }
};

export default page;
