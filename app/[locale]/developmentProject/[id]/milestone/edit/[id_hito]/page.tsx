import React from 'react';
import { getLocale } from 'next-intl/server';
import {
  getHitoProyectoDesarrolloById,
  HitoGetAllByIdProyecto,
} from '@/app/actions/proyectoDesarrollo/HitoProyectoDesarrolloActions';
import { getAllTipoHitoProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/TipoHitoProyectoDesarrolloActions';
import TipoHitoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/TipoHitoProyectoDesarrollo';
import HitoProyectoDesarrolloEdit from '@/app/[locale]/components/proyectoDesarrollo/milestone/HitoProyectoDesarrolloEdit';
import { getProyectoDesarrolloById } from '@/app/actions/proyectoDesarrollo/ProyectoDesarrolloActions';
import ProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProyectoDesarrollo';
import HitoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/HitoProyectoDesarrollo';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id, params.id_hito);
  return <HitoProyectoDesarrolloEdit data={data} t={t} id={params.id_hito} />;
}

const GetData = async (id: number, idHito: number) => {
  try {
    // Ejecutar las promesas en paralelo
    const [tiposHito, hitoProyectoDesarrollo, hitos] = await Promise.all([
      getAllTipoHitoProyectoDesarrollo(),
      getHitoProyectoDesarrolloById(idHito),
      HitoGetAllByIdProyecto(id),
    ]);

    // Calcular el monto total de los hitos
    const montoTotal = hitos.reduce(
      (total, hito: HitoProyectoDesarrollo) => total + hito.monto,
      0
    );

    // Obtener el monto total del proyecto asociado al hito
    const proyecto = (await getProyectoDesarrolloById(
      id
    )) as ProyectoDesarrollo;
    const montoProyecto = proyecto.monto;
    // Calcular el porcentaje pagado y el monto restante
    const porcentajePagado =
      montoProyecto > 0 ? (montoTotal / montoProyecto) * 100 : 0;
    const porcentajeRestante =
      montoProyecto > 0
        ? ((montoProyecto - montoTotal) / montoProyecto) * 100
        : 0;
    const montoRestantePorPagar = Math.max(montoProyecto - montoTotal, 0);

    // Mapear los tipos de hitos
    const mappedTiposHito = tiposHito.map((tipo) => {
      return new TipoHitoProyectoDesarrollo(tipo).getSelectOptions();
    });
    // Devolver los datos requeridos
    return {
      tiposHito: mappedTiposHito,
      hitoProyectoDesarrollo,
      porcentajeRestante,
      montoRestantePorPagar,
      montoProyecto,
    };
  } catch (error) {
    console.error('Error al obtener los datos de hito de proyecto:', error);
    throw error;
  }
};

export default page;
