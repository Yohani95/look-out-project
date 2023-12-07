"use client";
import React, { useState, useEffect } from "react";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import ErroData from "@/app/[locale]/components/common/ErroData";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import Novedad from "@/app/api/models/proyecto/Novedad";
import { fetchData,handleDelete } from "@/app/[locale]/utils/Form/UtilsForm";
import { novedadApiUrl,novedadWithEntetiesApiUrl } from "@/app/api/apiConfig";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { relative } from "path";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { RefreshList } from "@/app/api/models/common/ActionsCommon";
function ListNovelty({ locale, idPersona,idProyecto ,listaNovedades}) {
  //========DECLARACION DE VARIABLES ===============
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([new Novedad()]);
  const t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const columns = [
    { title: "ID", key: "id" },
    { title: t.user.idPerson, key: "idPersona" },
    { title: t.facture.project, key: "idProyecto" },
    { title: t.service.noveltyDate, key: "fechaInicio" },
    { title: t.service.dateTo, key: "fechaHasta" },
    { title: t.Common.profile, key: "IdPerfil" },
    { title: t.service.noveltyType, key: "idTipoNovedad" },
    { title: t.Common.observations, key: "observaciones" },
    {
      title: t.Account.action,
      key: "actions",
      render: (item) => (
        <>
          <Button size="sm" variant="link">
            <FaEdit size={16} onClick={()=>{router.push(`/service/editNovelty/${idProyecto}/${idPersona}/${item.id}`)}} />
          </Button>
          <Button size="sm" variant="link">
            <FaTrash size={16} className="" onClick={()=>{handleDelete(item.id,t,RefreshList,`${novedadApiUrl}`)}} />
          </Button>
        </>
      ),
    },
  ];
  //========FIN DECLARACION DE VARIABLES ===============

  //=======SECCION DE USSEFFECT===============
  const fillData=()=>{
      setData(listaNovedades);
  }
  useEffect(() => {
  fillData();
  setLoading(false);
  }, [listaNovedades]);
  //=======FIN SECCION DE USSEFFECT===============

  if (isLoading) return <LoadingData loadingMessage={t.Common.loadingData} />;
  if (error) return <ErroData message={t.Common.errorMsg} />;
  if (data.length === 0)
    return (
      <div className="text-center justify-content-center align-items-center">
        <h4>{t.Ficha.business}</h4> {t.Common.noData}
      </div>
    );
  return (
    <>
      <TableCommon
        columns={columns}
        noResultsFound={t.Common.noResultsFound}
        data={data}
        title={""}
        search={t.Account.table.search}
      />
    </>
  );
}

export default ListNovelty;
