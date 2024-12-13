'use client';
import React, { useState, useEffect, useMemo } from 'react';
import TableMaterialUI from '../common/TablaMaterialUi';
import LoadingData from '@/app/[locale]/components/common/LoadingData';
import ErroData from '@/app/[locale]/components/common/ErroData';
import { fetchPersonDTOContact } from '@/app/[locale]/utils/person/UtilsPerson';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

function ContactList({ locale, onRadioChange, idPersons, isView }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [selectedIds, setSelectedIds] = useState(
    Array.from(new Set(idPersons))
  ); // Inicializar con IDs únicos
  let t = require(`@/messages/${locale}.json`);

  // Crear columnas
  const columns = useMemo(() => {
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
        accessorKey: 'actions',
        header: t.Account.select,
        size: 50,
      },
    ];
  }, [t]);

  // Manejar cambio de selección
  const handleCheckboxChange = (itemId) => {
    setSelectedIds((prevIds) => {
      const updatedIds = prevIds.includes(itemId)
        ? prevIds.filter((id) => id !== itemId) // Eliminar ID si ya está seleccionado
        : [...prevIds, itemId]; // Agregar ID si no está en el arreglo
      const uniqueIds = Array.from(new Set(updatedIds.flat())); // Aplanar y eliminar duplicados
      console.log(uniqueIds);
      onRadioChange(uniqueIds); // Notificar al componente padre
      return uniqueIds;
    });
  };

  // Cargar datos una vez
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const fetchedData = await fetchPersonDTOContact();
        const modifiedData = fetchedData.data.map((item) => ({
          id: item.persona.id,
          perNombres:
            item.persona.perNombres + ' ' + item.persona.perApellidoPaterno ||
            'N/A',
          email: item.email || 'N/A',
          telefono: item.telefono || 'N/A',
        }));
        setData(modifiedData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Agregar checkbox dinámicamente a los datos
  const processedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      actions: (
        <input
          type="checkbox"
          name="idPerson"
          checked={selectedIds.includes(item.id)}
          onChange={() => handleCheckboxChange(item.id)}
          disabled={isView}
          className={`custom-checkbox ${
            isView ? 'disabled' : ''
          } form-check-input`}
        />
      ),
    }));
  }, [data, selectedIds, isView]);

  return (
    <>
      {isLoading ? (
        <LoadingData loadingMessage={t.Common.loadingData} />
      ) : error ? (
        <ErroData message={t.Common.errorOccurred} />
      ) : processedData.length === 0 ? (
        <div className="text-center justify-content-center align-items-center">
          <h4>{t.Account.table.contacts.title}</h4> {t.Common.noData}
        </div>
      ) : (
        <MemoizedTableMaterialUI columns={columns} data={processedData} />
      )}
    </>
  );
}

export default ContactList;
