import React from 'react';
import { getLocale } from 'next-intl/server';
import { getAllProfesionalProyectoDesarrolloByIdProyecto } from '@/app/actions/proyectoDesarrollo/ProfesionalProyectoDesarrolloActions';
import ProfesionalProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProfesionalProyectoDesarrollo';
import RegistroHorasProyectoDesarrolloCreate from '@/app/[locale]/components/proyectoDesarrollo/profesional/RegistroHorasProyectoDesarrolloCreate';
import BasePages from '@/app/[locale]/components/common/BasePages';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = [];
  return (
    <BasePages title={t.Common.hour}>
      <RegistroHorasProyectoDesarrolloCreate
        data={data}
        t={t}
        idProfesionalProyecto={params.idProfesional}
      />
    </BasePages>
  );
}

export default page;
