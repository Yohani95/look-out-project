import React from "react";
import { useLocale } from "next-intl";
import BasePages from "@/app/[locale]/components/common/BasePages";
import {
  GetData,
  fetchServiceById,
} from "@/app/[locale]/utils/business/UtilsService";
import ServiceEdit from "@/app/[locale]/components/business/Services/ServiceEdit";

import { tarifarioGetByIdProyectoApiUrl } from "@/app/api/apiConfig";
import { Constantes } from "@/app/api/models/common/Constantes";
import { getAllTipoFacturacion } from "@/app/api/actions/factura/TipoFacturacionActions";
import TipoFacturacion from "@/app/api/models/factura/TipoFacturacion";
import { getAllDiaPagos } from "@/app/api/actions/factura/DiaPagosActions";
import DiaPagos from "@/app/api/models/factura/DiaPagos";
import { getAllEmpresaPrestadora } from "@/app/api/actions/proyecto/EmpresaPrestadoraActions";
import EmpresaPrestadora from "@/app/api/models/proyecto/EmpresaPrestadora";
import { getAllByIdTipoPersona } from "@/app/actions/admin/PersonaActions";
import Persona from "@/app/api/models/admin/Persona";
async function page({ params }) {
  const tiposFacturas=await getAllTipoFacturacion();
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  const { proyecto, archivos } = await fetchServiceById(params.id, t);
  data.tarifarios = await fetch(
    `${tarifarioGetByIdProyectoApiUrl}/${params.id}`,
    {
      cache:"no-cache",
      next:{
        tags:["tarifas"]
      }
    }
  ).then(async (result) => {
    const data=await result.json()
    const tarifas = data?.data.map((item) => ({
      tcId: item.tcId,
      tcMoneda: item.moneda.monNombre,
      tcPerfilAsignado: item.perfil.prf_Nombre,
      tcPerfilAsignadoId:item.perfil.id,
      tcTarifa: item.tcTarifa,
      tcBase:
        Constantes.generarOpcionesDeTiempo(t).find(
          (option) => option.value === item.tcBase
        )?.label || "N/A",
    }));
    return tarifas;
  });
  const diaPagos=await getAllDiaPagos();
  const empresaPrestadora=await getAllEmpresaPrestadora();
  const personasKam=await getAllByIdTipoPersona(Constantes.TipoPersona.PERSONA_KAM)
  data.tiposFacturas=tiposFacturas.map((tipoFactura)=>{return new TipoFacturacion(tipoFactura).getSelectOptions()}); 
  data.diaPagos=diaPagos.map((diaPagos)=>{return new DiaPagos(diaPagos).getSelectOptions()}); 
  data.empresaPrestadora=empresaPrestadora.map((empresa)=>{return new EmpresaPrestadora(empresa).getSelectOptions()});
  data.personasKam=personasKam.map((kam)=>{return new Persona(kam).getSelectOptions()})
  return (
    <BasePages title={t.business.title}>
      <ServiceEdit
        t={t}
        idService={params.id}
        data={data}
        proyecto={JSON.parse(JSON.stringify(proyecto))}
        files={archivos}
      />
    </BasePages>
  );
}

export default page;
