import React from 'react';
import { getLocale } from 'next-intl/server';
import { getHitoProyectoDesarrolloById } from '@/app/actions/proyectoDesarrollo/HitoProyectoDesarrolloActions';
import { getAllTipoHitoProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/TipoHitoProyectoDesarrolloActions';
import TipoHitoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/TipoHitoProyectoDesarrollo';
import BasePages from '@/app/[locale]/components/common/BasePages';
import HitoProyectoDesarrolloEdit from '@/app/[locale]/components/proyectoDesarrollo/milestone/HitoProyectoDesarrolloEdit';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.id_hito);
  return <HitoProyectoDesarrolloEdit data={data} t={t} id={params.id_hito} />;
}

const GetData = async (id: number) => {
  try {
    const [tiposHito, hitoProyectoDesarrollo] = await Promise.all([
      getAllTipoHitoProyectoDesarrollo(),
      getHitoProyectoDesarrolloById(id),
    ]);

    const mappedTiposHito = tiposHito.map((tipo) => {
      return new TipoHitoProyectoDesarrollo(tipo).getSelectOptions();
    });

    return {
      tiposHito: mappedTiposHito,
      hitoProyectoDesarrollo,
    };
  } catch (error) {
    console.error('Error al obtener los datos de hito de proyecto:', error);
    throw error;
  }
};

export default page;
