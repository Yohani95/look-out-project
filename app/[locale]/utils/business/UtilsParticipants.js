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
export const handleInputChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
export const handleFormSubmit =
  (formData, translations, isEditMode = false, handleAddToTablaCommon,tarifario,idService) =>
  async (event) => {
    event.preventDefault();
    
    try {
      if (!validarRut(formData.perIdNacional)) {
        return;
      }
      //tipo persona en base de datos es 4 los profesionales quizas implementar un sedder
      const tipoPersona=4;
      const profesionalesDTO = {
        persona: {
          perIdNacional: formData.perIdNacional,
          perNombres: formData.perNombre,
          perApellidoPaterno: formData.perApellidoPaterno,
          perApellidoMaterno: formData.perApellidoMaterno,
          prfId: formData.prfId,
          tpeId: tipoPersona
        },
        participante: {
          pryId: idService,
          prfId: formData.prfId,
          fechaAsignacion: formData.fechaAsignacion,
          PerTartifa: tarifario.tcTarifa
        },
      };
      const url = isEditMode
        ? `${participanteApiUrl}/${formData.ppaId}` //falta id
        : `${participanteCreateAsyncApiUrl}`;
      const method = isEditMode ? "PUT" : "POST";
      await NotificationSweet({
        title: isEditMode
          ? translations.notification.loading.title
          : translations.notification.create.title,
        text: isEditMode
          ? translations.notification.loading.text
          : translations.notification.create.text,
        type: isEditMode
          ? translations.notification.loading.type
          : translations.notification.create.type,
        showLoading: true,
      });
      const response = await fetch(url, {
        method: method,
        headers: apiHeaders,
        body: JSON.stringify(profesionalesDTO),
      });
      if (response.ok) {
        NotificationSweet({
          title: translations.notification.success.title,
          text: translations.notification.success.text,
          type: translations.notification.success.type,
        });
        handleAddToTablaCommon();
      } else if (response.status === 409) {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
        });
      } else {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.notification.error.text,
          type: translations.notification.warning.type,
        });
      }
    } catch (error) {
      NotificationSweet({
        title: translations.notification.error.title,
        text: translations.notification.error.text,
        type: translations.notification.error.type,
      });
      console.error("Error sending data:", error);
      // router.push('');
    }
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
