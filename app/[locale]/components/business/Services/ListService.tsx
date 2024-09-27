'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  handleEdit,
  handleDelete,
  fetchProyecto,
  handleView,
  downloadFiles,
} from '@/app/[locale]/utils/business/UtilsService';
import ErroData from '@/app/[locale]/components/common/ErroData';
import LoadingData from '@/app/[locale]/components/common/LoadingData';
import { useRouter } from 'next/navigation';
import TableMaterialUI from '../../common/TablaMaterialUi';
import Proyecto from '@/app/api/models/proyecto/Proyecto';
import ServiceButtons from '../ServiceButtons';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function ListService({ locale }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  let t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const columns = useMemo(() => Proyecto.createColumns(t), [t]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
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
        type: item.tipoServicio.tseDescripcion,
        account: item.cliente.cliNombre,
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
  const memoizedActions = useMemo(() => {
    return data.map((item) => ({
      ...item,
      actions: (
        <>
          <ServiceButtons
            id={item.pryId}
            onDelete={() => handleDelete(item.pryId, t, fetchList)}
            onEdit={() => handleEdit(item.pryId, t, router.push)}
            onView={() => handleView(item.pryId, router.push)}
            downloadFile={() => downloadFiles(item.pryId, t)}
            t={t}
          />
        </>
      ),
    }));
  }, [data, t]);
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
        <MemoizedTableMaterialUI columns={columns} data={memoizedActions} />
      )}
    </>
  );
}

export default ListService;
