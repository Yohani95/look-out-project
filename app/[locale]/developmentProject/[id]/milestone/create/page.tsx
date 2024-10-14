import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import { getAllTipoHitoProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/TipoHitoProyectoDesarrolloActions';
import TipoHitoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/TipoHitoProyectoDesarrollo';
import HitoProyectoDesarrolloCreate from '@/app/[locale]/components/proyectoDesarrollo/milestone/HitoProyectoDesarrolloCreate';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  return (
    <HitoProyectoDesarrolloCreate
      data={data}
      t={t}
      idProyectoDesarrollo={params.id}
    />
  );
}

const GetData = async () => {
  try {
    const tiposHito = await getAllTipoHitoProyectoDesarrollo();

    const mappedTiposHito = tiposHito.map((tipo) => {
      return new TipoHitoProyectoDesarrollo(tipo).getSelectOptions();
    });

    return {
      tiposHito: mappedTiposHito,
    };
  } catch (error) {
    console.error('Error al obtener los datos de tipos de hito:', error);
    throw error;
  }
};

export default page;
