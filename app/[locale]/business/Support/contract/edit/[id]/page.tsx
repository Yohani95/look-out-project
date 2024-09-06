import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { useLocale } from 'next-intl';
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
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const tiposFacturas = (await getAllTipoFacturacion()) as TipoFacturacion[];
  const data = await GetData();
  const diaPagos = (await getAllDiaPagos()) as DiaPagos[];
  const empresaPrestadora =
    (await getAllEmpresaPrestadora()) as EmpresaPrestadora[];
  data.tiposFacturas = tiposFacturas.map((tipoFactura) => {
    return new TipoFacturacion(tipoFactura).getSelectOptions();
  });
  data.diaPagos = diaPagos.map((diaPagos) => {
    return new DiaPagos(diaPagos).getSelectOptions();
  });
  data.empresaPrestadora = empresaPrestadora.map((empresa) => {
    return new EmpresaPrestadora(empresa).getSelectOptions();
  });
  data.soporte = (await GetAllEntitiesById(params.id)) as Soporte;
  const personasKam = await getAllByIdTipoPersona(
    Constantes.TipoPersona.PERSONA_KAM
  );
  data.personasKam = personasKam.map((kam) => {
    return new Persona(kam).getSelectOptions();
  });
  return (
    <BasePages title={t.Common.supports}>
      <ContractEdit t={t} data={data} />
    </BasePages>
  );
}

export default page;
