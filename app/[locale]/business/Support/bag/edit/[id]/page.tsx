import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getLocale } from 'next-intl/server';
import { GetData } from '@/app/[locale]/utils/business/UtilsService';
import TipoFacturacion from '@/app/api/models/factura/TipoFacturacion';
import { getAllTipoFacturacion } from '@/app/api/actions/factura/TipoFacturacionActions';
import { getAllDiaPagos } from '@/app/api/actions/factura/DiaPagosActions';
import { getAllEmpresaPrestadora } from '@/app/api/actions/proyecto/EmpresaPrestadoraActions';
import DiaPagos from '@/app/api/models/factura/DiaPagos';
import EmpresaPrestadora from '@/app/api/models/proyecto/EmpresaPrestadora';
import Soporte from '@/app/api/models/support/Soporte';
import {
  GetAllEntitiesById,
  getsoporteById,
} from '@/app/api/actions/soporte/SoporteActions';
import BagEdit from '@/app/[locale]/components/support/bag/BagEdit';
import { getAllByIdTipoPersona } from '@/app/actions/admin/PersonaActions';
import { Constantes } from '@/app/api/models/common/Constantes';
import Persona from '@/app/api/models/admin/Persona';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  // Llamada a la función para obtener los datos básicos
  const data = await GetData();

  // Llamada a la función para obtener los datos extra (tiposFacturas, diaPagos, etc.)
  const extraData = await getExtraData(params.id);

  // Combinamos los datos básicos con los datos extra
  const combinedData = { ...data, ...extraData };
  return (
    <BasePages title={t.Common.supports}>
      <BagEdit t={t} data={combinedData} />
    </BasePages>
  );
}
const getExtraData = async (id) => {
  try {
    // Llamadas API en paralelo para obtener todos los datos necesarios
    const [tiposFacturas, diaPagos, empresaPrestadora, soporte, personasKam] =
      await Promise.all([
        getAllTipoFacturacion(),
        getAllDiaPagos(),
        getAllEmpresaPrestadora(),
        GetAllEntitiesById(id),
        getAllByIdTipoPersona(Constantes.TipoPersona.PERSONA_KAM),
      ]);

    // Mapeo de los datos
    const mappedTiposFacturas = tiposFacturas.map((tipoFactura) =>
      new TipoFacturacion(tipoFactura).getSelectOptions()
    );

    const mappedDiaPagos = diaPagos.map((diaPago) =>
      new DiaPagos(diaPago).getSelectOptions()
    );

    const mappedEmpresaPrestadora = empresaPrestadora.map((empresa) =>
      new EmpresaPrestadora(empresa).getSelectOptions()
    );

    const mappedPersonasKam = personasKam.map((kam) =>
      new Persona(kam).getSelectOptions()
    );

    // Verifica si el objeto soporte es plano y, si no, lo convierte
    const plainSoporte =
      typeof soporte === 'object' && soporte.constructor.name !== 'Object'
        ? JSON.parse(JSON.stringify(soporte))
        : soporte;

    return {
      tiposFacturas: mappedTiposFacturas,
      diaPagos: mappedDiaPagos,
      empresaPrestadora: mappedEmpresaPrestadora,
      soporte: plainSoporte,
      personasKam: mappedPersonasKam,
    };
  } catch (error) {
    console.error('Error al obtener los datos extra:', error);
    throw error;
  }
};
export default page;
