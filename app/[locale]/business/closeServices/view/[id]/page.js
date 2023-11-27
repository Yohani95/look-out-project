import React from "react";
import { useLocale } from "next-intl";
import BasePages from "@/app/[locale]/components/common/BasePages";
import { GetData } from "@/app/[locale]/utils/business/UtilsService";
import ServiceEdit from "@/app/[locale]/components/business/Services/ServiceEdit";
import { Constantes } from "@/app/api/models/common/Constantes";
import { fetchServiceById } from "@/app/[locale]/utils/business/UtilsService";
import { tarifarioGetByIdProyectoApiUrl } from "@/app/api/apiConfig";
import ProfessionalForm from "@/app/[locale]//components/business/Services/ProfessionalForm";
import Link from "next/link";
async function page({ params }) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData();
  const { proyecto, archivos } = await fetchServiceById(params.id, t);
  data.tarifarios = await fetch(
    `${tarifarioGetByIdProyectoApiUrl}/${params.id}`,
    {
      cache: "no-cache",
      next: {
        tags: ["tarifas"],
      },
    }
  ).then(async (result) => {
    result = await result.json();
    const tarifas = result.data?.map((item) => ({
      tcId: item.tcId,
      tcMoneda: item.moneda.monNombre,
      tcPerfilAsignado: item.perfil.prf_Nombre,
      tcPerfilAsignadoId: item.perfil.id,
      tcTarifa: item.tcTarifa,
      tcBase:
        Constantes.generarOpcionesDeTiempo(t).find(
          (option) => option.value === item.tcBase
        )?.label || "N/A",
    }));
    return tarifas;
  });
  return (
    <BasePages title={t.business.title}>
      <fieldset disabled>
        <ServiceEdit
          t={t}
          idService={params.id}
          data={data}
          proyecto={proyecto}
          files={archivos}
        />
      </fieldset>
      <ProfessionalForm
        t={t}
        idService={proyecto.pryId}
        perfiles={data.tarifarios}
      />
      <div className="d-flex justify-content-end mb-3">
        <Link href={"/business/closeServices/search"}>
          <button disabled={false} type="button" className="btn btn-danger m-2">
            {t.Common.goBack}
          </button>
        </Link>
      </div>
    </BasePages>
  );
}

export default page;
