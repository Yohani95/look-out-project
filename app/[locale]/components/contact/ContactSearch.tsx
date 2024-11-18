'use client';
import React, { useState, useEffect, useMemo } from 'react';
import ErroData from '@/app/[locale]/components/common/ErroData';
import LoadingData from '@/app/[locale]/components/common/LoadingData';
import {
  fetchPersonByContact,
  handleDelete,
  handleEdit,
  handleView,
} from '@/app/[locale]/utils/person/UtilsPerson';
import ActionButtons from '@/app/[locale]/components/contact/ActionButtons';
import { useRouter } from 'next/navigation';
import TableMaterialUI from '../common/TablaMaterialUi';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function ContactSearch({ locale }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  let t;
  t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const createColumns = () => {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'perNombres',
        header: t.Account.table.contacts.name,
        size: 100,
      },
      {
        accessorKey: 'cargo',
        header: t.Account.position,
        size: 100,
      },
      {
        accessorKey: 'email',
        header: t.Account.Email,
        size: 100,
      },
      {
        accessorKey: 'telefono',
        header: t.Account.phone,
        size: 100,
      },
      {
        accessorKey: 'account',
        header: t.Common.account,
        size: 100,
      },
      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 100,
      },
    ];
  };

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      setIsLoading(true);
      const fetchedData = await fetchPersonByContact();
      const modifiedData = await fetchedData.data.map((item) => ({
        ...item,
        id: item.persona.id,
        perNombres:
          item.persona.perNombres + ' ' + item.persona.perApellidoPaterno ||
          'N/A', // Reemplazar con "N/A" si es nulo
        cargo: item.persona.cargo || 'N/A',
        email: item.email || 'N/A',
        telefono: item.telefono || 'N/A',
        account: item.cuenta || 'N/A',
        idCliente: item.idCliente,
        // Agregar otros campos y reemplazar si es necesario
      }));
      setData(modifiedData); // Actualiza el estado con los datos manipulados
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  }
  const memoizedActions = useMemo(() => {
    return data.map((cliente) => ({
      ...cliente,
      actions: (
        <>
          <ActionButtons
            id={cliente.id}
            onDelete={() => handleDelete(cliente.id, t, fetchData)}
            onEdit={() =>
              handleEdit(cliente.id, cliente.idCliente, t, router.push)
            }
            onView={() =>
              handleView(cliente.id, cliente.idCliente, router.push)
            }
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
        <ErroData message={t.Common.errorOccurred} />
      ) : data.length === 0 ? ( // Verifica si no hay datos
        <div className="text-center justify-content-center align-items-center">
          <h4>{t.Account.table.contacts.title}</h4> {t.Common.noData}
        </div>
      ) : (
        <>
          <MemoizedTableMaterialUI
            columns={createColumns()}
            data={memoizedActions}
          />
        </>
      )}
    </>
  );
}

export default ContactSearch;
