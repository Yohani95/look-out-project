"use client";
import React, { useState, useEffect } from "react";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import ErroData from "@/app/[locale]/components/common/ErroData";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import { fetchPersonByContact } from "@/app/[locale]/utils/person/UtilsPerson";
function ContactList({ locale, onRadioChange,idPersons }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  let t;
  t = require(`@/messages/${locale}.json`);
  const columns = [
    {
      key: "id",
      title: "ID",
    },
    { key: "perNombres", title: t.Account.table.contacts.name, },
    { key: "position", title: t.Account.position },
    { key: "email", title: t.Account.Email },
    { key: "telefono", title: t.Account.phone },
    { key: "rol", title: t.Account.table.contacts.owner },
    {
      title: t.Account.select,
      key: "actions",
      render: (item) => (
        <input
          type="checkbox"
          name="idPerson"
          checked={idPersons.includes(item.id)} // Marca el radio button si es el elemento seleccionado
          onChange={() => handleRadioChange(item.id)} // Maneja el cambio de selección
        />
      ),
    },
  ];
  useEffect(() => {
    try {
      async function fetchData() {
        try {
            setIsLoading(true);
            const fetchedData = await fetchPersonByContact();
    
            // Manipulación de datos para reemplazar valores nulos con "N/A"
            const modifiedData = fetchedData.map((item) => ({
              ...item,
              perNombres: item.perNombres+' '+item.perApellidoPaterno || "N/A", // Reemplazar con "N/A" si es nulo
              email:"N/A",
              rol: "N/A",
              position:"N/A",
              email:"N/A",
              telefono:"N/A"
              // Agregar otros campos y reemplazar si es necesario
            }));
    
            setData(modifiedData); // Actualiza el estado con los datos manipulados
            setIsLoading(false);
        } catch (error) {
          setError(true);
          setIsLoading(false);
        }
      }
      fetchData();
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  }, []);

  const handleRadioChange = (itemId) => {
    setSelectedId(itemId)
    onRadioChange(itemId); // Llama a la función del componente Form para manejar el cambio de selección
  };
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
        <TableCommon
          columns={columns}
          noResultsFound={t.Common.noResultsFound}
          data={data}
          title={t.Account.table.contacts.title}
          search={t.Account.table.search}
        />
      )}
    </>
  );
}

export default ContactList;
