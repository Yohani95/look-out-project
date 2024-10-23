import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import { getAllTipoHitoProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/TipoHitoProyectoDesarrolloActions';
import TipoHitoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/TipoHitoProyectoDesarrollo';
import HitoProyectoDesarrolloCreate from '@/app/[locale]/components/proyectoDesarrollo/milestone/HitoProyectoDesarrolloCreate';
import { HitoGetAllByIdProyecto } from '@/app/actions/proyectoDesarrollo/HitoProyectoDesarrolloActions';
import HitoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/HitoProyectoDesarrollo';
import { getProyectoDesarrolloById } from '@/app/actions/proyectoDesarrollo/ProyectoDesarrolloActions';
import ProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProyectoDesarrollo';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id);
  return (
    <HitoProyectoDesarrolloCreate
      data={data}
      t={t}
      idProyectoDesarrollo={params.id}
    />
  );
}

const GetData = async (id: number) => {
  try {
    // Ejecutar las promesas de forma paralela para obtener los datos
    const [tiposHito, hitos, proyecto] = await Promise.all([
      getAllTipoHitoProyectoDesarrollo(),
      HitoGetAllByIdProyecto(id),
      getProyectoDesarrolloById(id) as Promise<ProyectoDesarrollo>,
    ]);

    // Calcular el monto total de los hitos
    const montoTotal = hitos.reduce(
      (total, hito: HitoProyectoDesarrollo) => total + hito.monto,
      0
    );
    console.log('monto de hitos ', montoTotal);
    // Obtener el monto del proyecto
    const montoProyecto = proyecto.monto;
    console.log('monto de total proyecto', montoProyecto);
    // Calcular el porcentaje pagado y el monto restante
    const porcentajePagado =
      montoProyecto > 0 ? (montoTotal / montoProyecto) * 100 : 0;
    const porcentajeRestante =
      montoProyecto > 0
        ? ((montoProyecto - montoTotal) / montoProyecto) * 100
        : 0;

    //monto por pagar
    const montoRestantePorPagar = Math.max(montoProyecto - montoTotal, 0);
    // Mapear los tipos de hitos
    const mappedTiposHito = tiposHito.map((tipo) => {
      return new TipoHitoProyectoDesarrollo(tipo).getSelectOptions();
    });
    console.log('porcentaje pagado', porcentajePagado);
    console.log('porcentaje restante', porcentajeRestante);
    console.log('monto por pagar ', montoRestantePorPagar);
    // Devolver los datos requeridos
    return {
      tiposHito: mappedTiposHito,
      porcentajeRestante,
      montoRestantePorPagar,
      montoProyecto,
    };
  } catch (error) {
    console.error('Error al obtener los datos de tipos de hito:', error);
    throw error;
  }
};

export default page;
