'use client';
import React, { useState, useEffect, useMemo } from 'react';
import LoadingData from '../common/LoadingData';
import ErroData from '../common/ErroData';
import ButtonsActions from './ButtonsActions';
import {
  handleClienteDelete,
  handleEdit,
  handleView,
  fechtClients,
} from '@/app/[locale]/utils/client/ClientFormLogic';
import { useRouter } from 'next/navigation';
import TableMaterialUI from '../common/TablaMaterialUi';
import Cliente from '@/app/api/models/cuenta/Cliente';
import Persona from '@/app/api/models/admin/Persona';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function List({ locale }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  let t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const columns = useMemo(() => Cliente.createColumns(t), [t]);
  const fecht = async () => {
    try {
      setIsLoading(true);
      const data = await fechtClients();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(true);
      setIsLoading(false);
    }
  };
  const memoizedActions = useMemo(() => {
    return data.map((clienteDTO) => ({
      ...clienteDTO,
      kam: new Persona(clienteDTO.cliente.kam).getNombreCompleto() || 'N/A',
      actions: (
        <>
          <ButtonsActions
            onDelete={() =>
              handleClienteDelete(clienteDTO.cliId, t, fechtClients)
            }
            onEdit={() => handleEdit(clienteDTO.cliId, t, router.push)}
            onView={() => handleView(clienteDTO.cliId, router.push)}
          />
        </>
      ),
    }));
  }, [data, t]);
  useEffect(() => {
    fecht();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingData loadingMessage={t.Common.loadingData} />
      ) : error ? (
        <ErroData message={t.Common.errorOccurred} />
      ) : data.length === 0 ? ( // Verifica si no hay datos
        <div className="text-center justify-content-center align-items-center">
          <h4>{t.title}</h4> {t.Common.noData}
        </div>
      ) : (
        <>
          <MemoizedTableMaterialUI columns={columns} data={memoizedActions} />
        </>
      )}
    </>
  );
}

export default List;
