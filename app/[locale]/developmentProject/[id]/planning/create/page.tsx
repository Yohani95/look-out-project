import React from 'react';
import { getLocale } from 'next-intl/server';
import EtapaProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/EtapaProyectoDesarrollo';
import PlanificacionProyectoDesarrolloCreate from '@/app/[locale]/components/proyectoDesarrollo/planification/PlanificacionProyectoDesarrolloCreate';
import { getAllEtapaProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/EtapaProyectoDesarrolloActions';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  return (
    <PlanificacionProyectoDesarrolloCreate
      data={data}
      t={t}
      idProyectoDesarrollo={params.id}
    />
  );
}

const GetData = async () => {
  try {
    const etapas = await getAllEtapaProyectoDesarrollo();

    const mappedEtapas = etapas.map((etapa) => {
      return new EtapaProyectoDesarrollo(etapa).getSelectOptions();
    });

    return {
      etapas: mappedEtapas,
    };
  } catch (error) {
    console.error('Error al obtener los datos de etapas:', error);
    throw error;
  }
};

export default page;
