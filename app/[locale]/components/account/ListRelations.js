"use client"
import React, { useState, useEffect } from "react";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
import ErroData from "@/app/[locale]/components/common/ErroData";
import { fetchClientsRelations } from "../../utils/client/ClientFormLogic";
function ListRelations({locale}) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    let translations = require(`@/messages/${locale}.json`);
    const columns = [
        {title:"ID",key:"id"},
        { title: translations.Ficha.name, key: "cliNombre" },
        { title: translations.Ficha.place, key: "secNombre" },
        { title: translations.Ficha.country, key: "paiNombre" },
        { title: translations.Ficha.KAM, key: "kam" },
      ];
    const fecht = async () => {
        try {
          setIsLoading(true);
          const data=await fetchClientsRelations()
          setData(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError(true);
          setIsLoading(false);
        }
      };
      useEffect(() => {
        fecht();
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
        title={translations.Nav.account.accountRelationship}
        search={translations.Account.table.search}
      />
    )}
  </>
  )
}

export default ListRelations