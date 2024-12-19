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
import ContractEdit from '@/app/[locale]/components/support/contract/ContractEdit';
import { getAllByIdTipoPersona } from '@/app/actions/admin/PersonaActions';
import { Constantes } from '@/app/api/models/common/Constantes';
import Persona from '@/app/api/models/admin/Persona';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  // Obtener los datos generales
  const data = await GetData();

  // Obtener los datos adicionales específicos
  const extraData = await getExtraData(params.id);

  // Combinar los datos generales con los datos adicionales
  const combinedData = { ...data, ...extraData };
  return <ContractEdit t={t} data={combinedData} />;
}
const getExtraData = async (id) => {
  try {
    const [tiposFacturas, diaPagos, empresaPrestadora, soporte, personasKam] =
      await Promise.all([
        getAllTipoFacturacion(),
        getAllDiaPagos(),
        getAllEmpresaPrestadora(),
        GetAllEntitiesById(id),
        getAllByIdTipoPersona(Constantes.TipoPersona.PERSONA_KAM),
      ]);

    // Mapeo de los datos a objetos planos
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

    // Si soporte no es un objeto plano, lo convertimos en uno
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
    console.error('Error al obtener los datos adicionales:', error);
    throw error;
  }
};
export default page;
