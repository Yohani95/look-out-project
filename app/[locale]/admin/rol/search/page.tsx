import BasePages from '@/app/[locale]/components/common/BasePages';
import React from 'react';
import Link from 'next/link';
import RolSearch from '@/app/[locale]/components/admin/rol/RolSearch';
import { getAllRol } from '@/app/actions/admin/RolActions';
import { getLocale } from 'next-intl/server';

async function page() {
  // Fetch data directamente en la función del servidor.
  const data = await getAllRol();
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  return (
    <BasePages
      title="Rol"
      description="Descripción de la página de roles"
      actionButton={
        <>
          <Link href={'/admin/rol/create'}>
            <button type="button" className="btn btn-primary me-2">
              Añadir Rol
            </button>
          </Link>
        </>
      }
    >
      <RolSearch data={data} t={t} />
    </BasePages>
  );
}

export default page;
