"use client";
import React, { useState, useEffect } from "react";
import {
    handleEdit,
    handleDelete,
    fetchPhone,
    handleView,
  } from "@/app/[locale]/utils/phone/UtilsPhone";
import CommonActionsButton from "@/app/[locale]/components/common/CommonActionsButtons";
import ErroData from "@/app/[locale]/components/common/ErroData";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import { useRouter } from "next/navigation";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import { FaCheck, FaTimes } from "react-icons/fa";
function ListPhone({ locale }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  let t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const columns = [
    { title: "ID", key: "telId" },
    { title: t.Common.phone, key: "telNumero" },
    { title: t.Account.type, key: "tteId" },
    { title: t.Common.name, key: "perId" },
    { title: t.Common.account, key: "cliId" },
    { title: t.user.active, key: "telVigente" },
    {
      title: t.Account.select,
      key: "actions",
      render: (item) => (
        <CommonActionsButton
          id={item.usu_id}
          onDelete={() => handleDelete(item.telId,t,fetchList)}
          onEdit={() => handleEdit(item.telId,t,router.push)}
          onView={()=>handleView(item.telId,router.push)}
        />
      ),
    },
  ];
  const fetchList = async () => {
    try {
      setIsLoading(true);
      const response = await fetchPhone();
      const modifiedData = await response.map((item) => ({
        ...item,
        perId:
          item.persona.perNombres + " " + item.persona.perApellidoPaterno || "N/A", // Reemplazar con "N/A" si es nulo
          cliId:
          item.cliente.cliNombre  || "N/A", // Reemplazar con "N/A" si es nulo
          tteId: item.tipoTelefono.tteNombre,
          telVigente: item.telVigente ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />
      }));
      setData(modifiedData);
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
          <h4>{t.Common.phones}</h4> {t.Common.noData}
        </div>
      ) : (
        <TableCommon
          columns={columns}
          noResultsFound={t.Common.noResultsFound}
          data={data}
          title={t.Common.phones}
          search={t.Account.table.search}
        />
      )}
    </>
  );
}

export default ListPhone;
