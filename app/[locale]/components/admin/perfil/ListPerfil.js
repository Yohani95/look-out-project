"use client";
import React, { useState, useEffect } from "react";
import {
    handleEdit,
    handleDelete,
    fetchPerfil,
    handleView,
  } from "@/app/[locale]/utils/admin/perfil/UtilsPerfil";
import CommonActionsButton from "@/app/[locale]/components/common/CommonActionsButtons";
import ErroData from "@/app/[locale]/components/common/ErroData";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import { useRouter } from "next/navigation";
import TableCommon from "@/app/[locale]/components/common/TableCommon"
function ListPerfil({locale}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  let t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const columns = [
    { title: "ID", key: "id" },
    { title: t.Common.name, key: "prf_Nombre" },
    { title: t.Common.account, key: "prf_Descripcion" },
    {
      title: t.Account.select,
      key: "actions",
      render: (item) => (
        <CommonActionsButton
          id={item.id}
          onDelete={() => handleDelete(item.id,t,fetchList)}
          onEdit={() => handleEdit(item.id,t,router.push)}
          onView={()=>handleView(item.id,router.push)}
        />
      ),
    },
  ];
  const fetchList = async () => {
    try {
      setIsLoading(true);
      const responseData = await fetchPerfil();
      setData(responseData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching phone data:", error);
      setError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
    {isLoading ? (
      <LoadingData loadingMessage={t.Common.loadingData} />
    ) : error ? (
      <ErroData message={t.Common.errorMsg} />
    ) : data.length === 0 ? ( // Verifica si no hay datos
      <div className="text-center justify-content-center align-items-center">
        <h4>{t.Common.perfil}</h4> {t.Common.noData}
      </div>
    ) : (
      <TableCommon
        columns={columns}
        noResultsFound={t.Common.noResultsFound}
        data={data}
        title={t.Common.perfil}
        search={t.Account.table.search}
      />
    )}
  </>
  )
}

export default ListPerfil