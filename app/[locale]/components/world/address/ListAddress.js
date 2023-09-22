"use client";
import React, { useState, useEffect } from "react";
import {
    handleEdit,
    handleDelete,
    fetchaddress,
    handleView,
  } from "@/app/[locale]/utils/address/UtilsAddress";
import CommonActionsButton from "@/app/[locale]/components/common/CommonActionsButtons";
import ErroData from "@/app/[locale]/components/common/ErroData";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import { useRouter } from "next/navigation";
import TableCommon from "../../common/TableCommon";
function ListAddress({locale}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  let t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const columns = [
    { title: "ID", key: "dirId" },
    { title: t.Common.phone, key: "dirCalle" },
    { title: t.Account.type, key: "dirNumero" },
    { title: t.Account.type, key: "dirBlock" },
    { title: t.user.active, key: "tdiId" },
    { title: t.Account.type, key: "comId" },
    { title: t.Common.name, key: "perId" },
    { title: t.Common.account, key: "cliId" },
    {
      title: t.Account.select,
      key: "actions",
      render: (item) => (
        <CommonActionsButton
          id={item.emaId}
          onDelete={() => handleDelete(item.dirId,t,fetchList)}
          onEdit={() => handleEdit(item.dirId,t,router.push)}
          onView={()=>handleView(item.dirId,router.push)}
        />
      ),
    },
  ];
  const fetchList = async () => {
    try {
      setIsLoading(true);
      const response = await fetchaddress();
      console.log(response)
       const modifiedData = await response.map((item) => ({
      //   ...item,
      //   perId:
      //     item.persona.perNombres + " " + item.persona.perApellidoPaterno || "N/A", // Reemplazar con "N/A" si es nulo
      //     cliId:
      //     item.cliente ? item.cliente.cliNombre : "N/A"    , // Reemplazar con "N/A" si es nulo
      //     tteId: item.tipoTelefono.tteNombre,
      //     telVigente: item.telVigente ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />
       }));
      setData(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        <h4>{t.Common.address}</h4> {t.Common.noData}
      </div>
    ) : (
      <TableCommon
        columns={columns}
        noResultsFound={t.Common.noResultsFound}
        data={data}
        title={t.Common.address}
        search={t.Account.table.search}
      />
    )}
  </>
  )
}

export default ListAddress