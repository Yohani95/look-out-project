import React from 'react';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import {
  GetData,
  fetchServiceById,
} from '@/app/[locale]/utils/business/UtilsService';
import ServiceEdit from '@/app/[locale]/components/business/Services/ServiceEdit';

import { tarifarioGetByIdProyectoApiUrl } from '@/app/api/apiConfig';
import { Constantes } from '@/app/api/models/common/Constantes';
import { getAllTipoFacturacion } from '@/app/api/actions/factura/TipoFacturacionActions';
import { getAllDiaPagos } from '@/app/api/actions/factura/DiaPagosActions';
import { getAllEmpresaPrestadora } from '@/app/api/actions/proyecto/EmpresaPrestadoraActions';
import { getAllByIdTipoPersona } from '@/app/actions/admin/PersonaActions';

async function page({ params }) {
  const tiposFacturas = await getAllTipoFacturacion();
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();

  // Fetch data for proyecto and archivos
  const { proyecto, archivos } = await fetchServiceById(params.id, t);
  // Fetch tarifarios and process them as plain objects
  data.tarifarios = await fetch(
    `${tarifarioGetByIdProyectoApiUrl}/${params.id}`,
    {
      cache: 'no-cache',
      next: {
        tags: ['tarifas'],
      },
    }
  ).then(async (result) => {
    const data = await result.json();
    return data?.data.map((item) => ({
      tcId: item.tcId,
      tcMoneda: item.moneda.monNombre,
      tcPerfilAsignado: item.perfil.prf_Nombre,
      tcPerfilAsignadoId: item.perfil.id,
      tcTarifa: item.tcTarifa,
      tcBase:
        Constantes.generarOpcionesDeTiempo(t).find(
          (option) => option.value === item.tcBase
        )?.label || 'N/A',
    }));
  });

  const diaPagos = await getAllDiaPagos();
  const empresaPrestadora = await getAllEmpresaPrestadora();
  const personasKam = await getAllByIdTipoPersona(
    Constantes.TipoPersona.PERSONA_KAM
  );

  // Asignar valores a data como objetos planos
  data.tiposFacturas = tiposFacturas.map((tipoFactura) => tipoFactura);
  data.diaPagos = diaPagos.map((diaPago) => diaPago);
  data.empresaPrestadora = empresaPrestadora.map((empresa) => empresa);
  data.personasKam = personasKam.map((kam) => kam);

  // Pasa solo datos JSON serializables
  return (
    <BasePages title={t.business.title}>
      <ServiceEdit
        t={t}
        idService={params.id}
        data={data}
        proyecto={JSON.parse(JSON.stringify(proyecto))}
        files={archivos} // Ahora 'archivos' es una lista de objetos planos
      />
    </BasePages>
  );
}

export default page;
