"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  handleEdit,
  handleDelete,
  fetchProyecto,
  handleView,
  downloadFiles,
} from "@/app/[locale]/utils/business/UtilsService";
import ServiceButtons from "@/app/[locale]/components/business/ServiceButtons";
import ErroData from "@/app/[locale]/components/common/ErroData";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import { useRouter } from "next/navigation";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import { FaCheck, FaTimes } from "react-icons/fa";
function ListService({ locale }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  let t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const columns = [
    { title: t.Common.correlative, key: "pryId" },
    { title: t.Common.name, key: "pryNombre" },
    { title: t.Common.account, key: "account" },
    { title: t.Account.type + " " + t.Account.business, key: "type" },
    { title: t.business.estimatedStartDate, key: "pryFechaInicioEstimada" },
    { title: t.business.estimatedClosingDate, key: "pryFechaCierreEstimada" },
    {
      title: t.Account.select,
      key: "actions",
      render: (item) => (
        <ServiceButtons
          id={item.pryId}
          onDelete={() => handleDelete(item.pryId, t, fetchList)}
          onEdit={() => handleEdit(item.pryId, t, router.push)}
          onView={() => handleView(item.pryId, router.push)}
          downloadFile={() => downloadFiles(item.pryId, t)}
        />
      ),
    },
  ];
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const fetchList = async () => {
    try {
      setIsLoading(true);
      const response = await fetchProyecto();
      const modifiedData = await response.map((item) => ({
        ...item,
        pryFechaInicioEstimada: formatDate(item.pryFechaInicioEstimada),
        pryFechaCierreEstimada: formatDate(item.pryFechaCierreEstimada),
        type: item.tipSer.tseDescripcion,
        account:item.cli.cliNombre
        //     item.per.perNombres + " " + item.per.perApellidoPaterno || "N/A", // Reemplazar con "N/A" si es nulo
        //     cliId:
        //     item.cli.cliNombre  || "N/A", // Reemplazar con "N/A" si es nulo
        //     temId: item.tem.temNombre,
        //     emaVigente: item.emaVigente ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />

        //   // Agregar otros campos y reemplazar si es necesario
      }));
      setData(modifiedData);
      setIsLoading(false);
    } catch (error) {
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
          <h4>{t.Ficha.business}</h4> {t.Common.noData}
        </div>
      ) : (
        <TableCommon
          columns={columns}
          noResultsFound={t.Common.noResultsFound}
          data={data}
          title={t.Ficha.business}
          search={t.Account.table.search}
        />
      )}
    </>
  );
}

export default ListService;
