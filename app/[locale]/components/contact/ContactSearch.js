"use client";
import React, { useState, useEffect } from "react";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import ErroData from "@/app/[locale]/components/common/ErroData";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import { fetchPersonByContact,handleDelete,handleEdit,handleView } from "@/app/[locale]/utils/person/UtilsPerson";
import  ActionButtons  from "@/app/[locale]/components/contact/ActionButtons";
import { useRouter } from "next/navigation";
function ContactSearch({ locale }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  let t;
  t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const columns = [
    {
      key: "id",
      title: "ID",
    },
    { key: "perNombres", title: t.Account.table.contacts.name },
    { key: "position", title: t.Account.position },
    { key: "email", title: t.Account.Email },
    { key: "telefono", title: t.Account.phone },
    //{ key: "rol", title: t.Account.table.contacts.owner },
    { key: "account", title: t.Common.account },
      {
        title:t.Account.action,
        key: "actions",
        render: (item) => (
          <ActionButtons
            id={item.id}
            onDelete={() => handleDelete(item.id,t,fetchData)}
            onEdit={() => handleEdit(item.id,t,router.push)}
            onView={()=>handleView(item.id,router.push)}
          />
        ),
      },
  ];
  useEffect(() => {
      fetchData();
  }, []);
  async function fetchData() {
    try {
      setIsLoading(true);
      const fetchedData = await fetchPersonByContact();
      const modifiedData = await fetchedData.data.map((item) => ({
        ...item,
        id:item.persona.id,
        perNombres:
          item.persona.perNombres + " " + item.persona.perApellidoPaterno || "N/A", // Reemplazar con "N/A" si es nulo
        position: "N/A",
        email: item.email||"N/A",
        telefono: item.telefono||"N/A",
        account: item.cuenta||"N/A"
        // Agregar otros campos y reemplazar si es necesario
      }));
      setData(modifiedData); // Actualiza el estado con los datos manipulados
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  }
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

export default ContactSearch;
