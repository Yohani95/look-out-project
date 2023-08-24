"use client";
import React, { useState, useEffect } from "react";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import ErroData from "../../common/ErroData";
import LoadingData from "../../common/LoadingData";
import ButtonsActions from "./ButtonsActions";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet"; // Importa la función de notificación
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import { userApiUrl,apiHeaders } from "@/app/api/apiConfig";
import axios from "axios";
import { useRouter} from 'next/navigation';
function UserListClient({ traslations,locale }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  let trans;
  trans = require(`@/messages/${locale}.json`);
  const columns = [
    { title: "ID", key: "usuId" },
    { title: traslations.table.username, key: "usuNombre" },
    { title: traslations.table.idPerson, key: "perId" },
    { title: traslations.table.idProfile, key: "prfId" },
    { title: traslations.table.active, key: "usuVigente" },
    {
      title: "Acciones",
      key: "actions",
      render: (item) => (
        <ButtonsActions
          id={item.usu_id}
          onDelete={() => handleDeleteUser(item.usuId)}
          onEdit={() => handleEditUser(item.usuId)}
        />
      ),
    },
  ];
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(userApiUrl,{headers: apiHeaders}); 
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDeleteUser = async (userId) => {
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
          console.log("Usuario eliminado con éxito");
          NotificationSweet({
            title: trans.notification.success.title,
            text: trans.notification.success.text,
            type: trans.notification.success.type,
          });
          // Actualiza la lista de usuarios después de eliminar
          fetchUsers();
        } else {
          console.error("Error al eliminar el usuario:", response.statusText);
          NotificationSweet({
            title: trans.notification.error.title,
            text: trans.notification.error.text,
            type: trans.notification.error.type,
          });
        }
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        NotificationSweet({
          title: "Error!",
          text: "An error occurred while deleting the user.",
          type: "error",
        });
      }
    }
  };
  const router=useRouter()
  const handleEditUser = async (userId) => {
    const confirmed = await ConfirmationDialog(
      trans.notification.edit.title,
      trans.notification.edit.text,
      trans.notification.edit.type,
      trans.notification.edit.buttonOk,
      trans.notification.edit.buttonCancel
    );
    if (confirmed) {
      router.push(`/admin/user/edit/${userId}`)
    }
  };
  return (
    <>
      {isLoading ? (
        <LoadingData loadingMessage={traslations.loadingData} />
      ) : error ? (
        <ErroData message={traslations.errorMsg} />
      ) : data.length === 0 ? ( // Verifica si no hay datos
        <div className="text-center justify-content-center align-items-center">
          <h4>{traslations.title}</h4> {trans.Common.noData}
        </div>
      ) : (
        <TableCommon
          columns={columns}
          noResultsFound={traslations.noResultsFound}
          data={data}
          title={traslations.title}
          search={traslations.search}
        />
      )}
    </>
  );
}

export default UserListClient;
