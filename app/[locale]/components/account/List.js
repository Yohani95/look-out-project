"use client";
import React, { useState, useEffect } from "react";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import LoadingData from "../common/LoadingData";
import ErroData from "../common/ErroData";
import axios from "axios";
import ButtonsActions from "./ButtonsActions";
import { apiHeaders, clientWithEntitiesApiUrl } from "@/app/api/apiConfig";
function List({ locale }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  let translations = require(`@/messages/${locale}.json`);

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
          onDelete={() => handleDelete(item.cliId)}
          onEdit={() => handleEdit(item.cliId)}
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
      console.log(modifiedData)
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

  const handleDelete = async (userId) => {
    const confirmed = await ConfirmationDialog(
      trans.notification.deleting.title,
      trans.notification.deleting.text,
      trans.notification.deleting.type,
      trans.notification.deleting.buttonOk,
      trans.notification.deleting.buttonCancel
    );
    if (confirmed) {
      await NotificationSweet({
        title: trans.notification.loading.title,
        text: "",
        type: trans.notification.loading.type,
        showLoading: true,
      });
      try {
        const response = await axios.delete(`${userApiUrl}/${userId}`); // Utiliza Axios para hacer la solicitud DELETE
        console.log(response)
        if (response.status==204) {
          NotificationSweet({
            title: trans.notification.success.title,
            text: trans.notification.success.text,
            type: trans.notification.success.type,
          });
          // Actualiza la lista de usuarios después de eliminar
          fetchUsers();
        } else {
          NotificationSweet({
            title: trans.notification.error.title,
            text: trans.notification.error.text,
            type: trans.notification.error.type,
          });
        }
      } catch (error) {
        NotificationSweet({
          title: "Error!",
          text: "An error occurred while deleting the user.",
          type: "error",
        });
      }
    }
  };

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
