import React from "react";
import { useTranslations, useLocale } from "next-intl";
import FormNovelty from "@/app/[locale]/components/business/Services/FormNovelty";
import BasePages from "@/app/[locale]/components/common/BasePages";
import { fetchData } from "@/app/[locale]/utils/Form/UtilsForm";
import { novedadApiUrl,novedadWithEntetiesApiUrl } from "@/app/api/apiConfig";
async function page({ params }) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const listaNovedades=await fetchData(`${novedadWithEntetiesApiUrl}`)
  .then((novedad) => {
    const filter = novedad.filter((item) => item.idPersona == params.idPersona);
    
    const updatedData = filter.map((item) => ({
      ...item,
      idTipoNovedad: item.tipoNovedades.nombre,
      fechaHasta: item.fechaHasta? new Date(item.fechaHasta).toLocaleDateString("es-CL"): 'N/A',
      fechaInicio:new Date(item.fechaInicio).toLocaleDateString("es-CL")|| 'N/A',
      IdPerfil: item.perfil?  item.perfil.nombre: 'N/A'
    }));
    return updatedData;
  });
  return (
    <>
      <BasePages title={t.Nav.services.createNovelty}>
        <FormNovelty
          locale={locale}
          idPersona={params.idPersona}
          idProyecto={params.IdProject}
          listaNovedades={listaNovedades}
        />
      </BasePages>
    </>
  );
}

export default page;
