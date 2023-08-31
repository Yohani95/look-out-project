"use client";
import React, { useState, useEffect } from "react";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import LoadingData from "../common/LoadingData";
import ErroData from "../common/ErroData";
import axios from "axios";
import ButtonsActions from "./ButtonsActions";
import { apiHeaders, clientWithEntitiesApiUrl,clientDeleteApiUrl } from "@/app/api/apiConfig";
import {handleClienteDelete,handleEdit,handleView} from "@/app/[locale]/utils/client/ClientFormLogic"
import { useRouter } from "next/navigation";
function List({ locale }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  let translations = require(`@/messages/${locale}.json`);
  const router=useRouter();
  const columns = [
    { title: "ID", key: "cliId" },
    { title: translations.Ficha.name, key: "cliNombre" },
    { title: translations.Ficha.place, key: "sectorComercial" },
    { title: translations.Ficha.country, key: "pais" },
    { title: translations.Ficha.Email, key: "email" },
    {
      title: "Acciones",
      key: "actions",
      render: (item) => (
        <ButtonsActions
          id={item.usu_id}
          onDelete={() => handleClienteDelete(item.cliId,translations,fechtClients)}
          onEdit={() => handleEdit(item.cliId,translations,router.push)}
          onView={()=>handleView(item.cliId,router.push)}
        />
      ),
    },
  ];
  const fechtClients = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(clientWithEntitiesApiUrl, { headers: apiHeaders });
      const modifiedData = response.data.map((item) => ({
        ...item,
        sectorComercial: item.sectorComercial.secNombre,
        pais: item.pais.paiNombre,
        email: "N/A",
      }));
      setData(modifiedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fechtClients();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingData loadingMessage={translations.Common.loadingData} />
      ) : error ? (
        <ErroData message={translations.Common.errorOccurred} />
      ) : data.length === 0 ? ( // Verifica si no hay datos
        <div className="text-center justify-content-center align-items-center">
          <h4>{translations.title}</h4> {translations.Common.noData}
        </div>
      ) : (
        <TableCommon
          columns={columns}
          noResultsFound={translations.Common.noResultsFound}
          data={data}
          title={translations.Common.accounts}
          search={translations.Account.table.search}
        />
      )}
    </>
  );
}

export default List;
