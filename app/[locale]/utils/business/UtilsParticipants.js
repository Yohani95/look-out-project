import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import {
  participanteCreateAsyncApiUrl,
  participanteApiUrl,
  participanteGetByIdProyectoApiUrl,
  participanteDeletedByRutApiUrl,
  apiHeaders 
} from "@/app/api/apiConfig";
import { validarRut } from "@/app/[locale]/utils/Common/UtilsChilePersonas";
import { Constantes } from "@/app/api/models/common/Constantes";
export const handleInputChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

  export const handleDelete = async (rut, trans) => {
    return new Promise(async (resolve, reject) => {
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
          const response = await fetch(`${participanteDeletedByRutApiUrl}/${rut}`, {
            method: "DELETE",
          });
  
          if (response.ok) {
            NotificationSweet({
              title: trans.notification.success.title,
              text: trans.notification.success.text,
              type: trans.notification.success.type,
            });
            resolve(200); // Resolvemos la promesa si la eliminación es exitosa.
          } else {
            NotificationSweet({
              title: trans.notification.error.title,
              text: trans.notification.error.text,
              type: trans.notification.error.type,
            });
            resolve(response.status);
            // Rechazamos la promesa si hay un error.
          }
        } catch (error) {
          NotificationSweet({
            title: trans.notification.error.title,
            text: trans.notification.error.text,
            type: trans.notification.error.type,
          });
          resolve(new Error('Mensaje de error'));
        }
      } else {
        resolve(new Error('Eliminación cancelada')); // Rechazamos la promesa si la eliminación se cancela.
      }
    });
  };
  
export const handleEdit = async (id, trans, push) => {
  const confirmed = await ConfirmationDialog(
    trans.notification.edit.title,
    trans.notification.edit.text,
    trans.notification.edit.type,
    trans.notification.edit.buttonOk,
    trans.notification.edit.buttonCancel
  );
  if (confirmed) {
    push(`//edit/${id}`);
  }
};
export const handleView = async (id, push) => {
  push(`//view/${id}`);
};
export const fetchParticipanteByIdProyecto = async (id) => {
    try {
      const response = await fetch(`${participanteGetByIdProyectoApiUrl}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
