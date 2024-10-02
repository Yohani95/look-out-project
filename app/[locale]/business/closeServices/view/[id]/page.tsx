import React from 'react';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { GetData } from '@/app/[locale]/utils/business/UtilsService';
import ServiceEdit from '@/app/[locale]/components/business/Services/ServiceEdit';
import { Constantes } from '@/app/api/models/common/Constantes';
import { fetchServiceById } from '@/app/[locale]/utils/business/UtilsService';
import { tarifarioGetByIdProyectoApiUrl } from '@/app/api/apiConfig';
import ProfessionalForm from '@/app/[locale]/components/business/Services/ProfessionalForm';
import Link from 'next/link';
import { getAllTipoFacturacion } from '@/app/api/actions/factura/TipoFacturacionActions';
import TipoFacturacion from '@/app/api/models/factura/TipoFacturacion';
import { getAllDiaPagos } from '@/app/api/actions/factura/DiaPagosActions';
import DiaPagos from '@/app/api/models/factura/DiaPagos';
import { getAllEmpresaPrestadora } from '@/app/api/actions/proyecto/EmpresaPrestadoraActions';
import EmpresaPrestadora from '@/app/api/models/proyecto/EmpresaPrestadora';
import { getAllByIdTipoPersona } from '@/app/actions/admin/PersonaActions';
import Persona from '@/app/api/models/admin/Persona';
async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  const { proyecto, archivos } = await fetchServiceById(params.id, t);
  const tiposFacturas = await getAllTipoFacturacion();
  const result = `${tarifarioGetByIdProyectoApiUrl}/${params.id}`;
  const response = await fetch(
    `${tarifarioGetByIdProyectoApiUrl}/${params.id}`,
    {
      cache: 'no-cache',
      next: {
        tags: ['tarifas'],
      },
    }
  );
  const resultTarifa = await response.json();
  const personasKam = await getAllByIdTipoPersona(
    Constantes.TipoPersona.PERSONA_KAM
  );
  // Verifica que `result.data` exista antes de intentar mapear los elementos
  data.tarifarios = resultTarifa.data?.map((item: any) => ({
    tcId: item.tcId,
    tcMoneda: item.moneda.monNombre,
    tcPerfilAsignado:
      item.perfil.prf_Nombre + ' ' + item.perfil.prf_Descripcion,
    tcPerfilAsignadoId: item.perfil.id,
    tcTarifa: item.tcTarifa,
    tcBase:
      Constantes.generarOpcionesDeTiempo(t).find(
        (option) => option.value === item.tcBase
      )?.label || 'N/A',
  }));
  const diaPagos = await getAllDiaPagos();
  const empresaPrestadora = await getAllEmpresaPrestadora();
  data.tiposFacturas = tiposFacturas.map((tipoFactura) => {
    return new TipoFacturacion(tipoFactura).getSelectOptions();
  });
  data.diaPagos = diaPagos.map((diaPagos) => {
    return new DiaPagos(diaPagos).getSelectOptions();
  });
  data.empresaPrestadora = empresaPrestadora.map((empresa) => {
    return new EmpresaPrestadora(empresa).getSelectOptions();
  });
  data.personasKam = personasKam.map((kam) => {
    return new Persona(kam).getSelectOptions();
  });
  // Convertir `proyecto` y `archivos` a objetos planos
  const plainProyecto = proyecto ? { ...proyecto } : null;
  return (
    <BasePages title={t.business.title}>
      <fieldset disabled>
        <ServiceEdit
          t={t}
          data={data}
          proyecto={plainProyecto}
          files={archivos}
        />
      </fieldset>
      <ProfessionalForm
        t={t}
        proyecto={plainProyecto}
        idService={proyecto.pryId}
        perfiles={data.tarifarios}
      />
      <div className="d-flex justify-content-end mb-3">
        <Link href={'/business/closeServices/search'}>
          <button disabled={false} type="button" className="btn btn-danger m-2">
            {t.Common.goBack}
          </button>
        </Link>
      </div>
    </BasePages>
  );
}

export default page;
