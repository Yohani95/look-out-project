import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { apiHeaders } from "@/app/api/apiConfig";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import { tagAction } from "../../components/admin/professionals/ProfessionalsActions";
export const handleInputChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
export const handleSelectChange = (event, fieldName, setFormData) => {
  const selectedValue = event.target.value;
  //console.log(`Selected ${fieldName}:`, selectedValue);
  setFormData((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
};
/*
   =================================================================================
   Funcion SUBMIT GENERICO
   =================================================================================
*/
export const handleFormSubmit = async (
  formData,
  translations,
  push,
  isEditMode = false,
  redirectLink,
  apiUrl,
  id
) => {
  try {
    await handleLoandingNotification(translations, isEditMode);
    const url = isEditMode ? `${apiUrl.edit}/${id}` : `${apiUrl.create}`;
    const method = isEditMode ? "PUT" : "POST";
    //console.log(url);
    //console.log(method);
    //console.log(JSON.stringify(formData));
    const response = await fetch(url, {
      method: method,
      headers: apiHeaders,
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      handleSuccessNotification(translations, push, redirectLink);
    } else if (response.status === 409) {
      handleConflictNotification(translations, push, isEditMode, redirectLink);
    } else {
      handleWarningNotification(translations, push, isEditMode, redirectLink);
    }
  } catch (error) {
    handleErrorNotification(translations, push);
    console.error("Error sending data:", error);
  }
};
/*
   =================================================================================
   Funcion GETALL GENERICO
   =================================================================================
*/
export const fetchData = async (url) => {
  try {
    const response = await fetch(url, {
      cache: "no-cache",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
/*
   =================================================================================
   Funcion Delete Generica
   =================================================================================
*/
export const handleDelete = async (id, trans, fetchData, url) => {
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
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        NotificationSweet({
          title: trans.notification.success.title,
          text: trans.notification.success.text,
          type: trans.notification.success.type,
        });
        // Actualiza la lista o después de eliminar
        if (fetchData) {
          await fetchData();
        }
      } else {
        NotificationSweet({
          title: trans.notification.error.title,
          text: trans.notification.error.text,
          type: trans.notification.error.type,
        });
      }
    } catch (error) {
      NotificationSweet({
        title: trans.notification.error.title,
        text: trans.notification.error.text,
        type: trans.notification.error.type,
      });
    }
  }
};
/*
   =================================================================================
   Funciones de utilidad PARA SWEETALERT, ESTAS SON GENERICAS PARA SER REUTILIZADAS
   =================================================================================
*/
function handleSuccessNotification(translations, push, redirectLink) {
  NotificationSweet({
    title: translations.notification.success.title,
    text: translations.notification.success.text,
    type: translations.notification.success.type,
    push: push !== null ? push : null,
    link: redirectLink!==null ? `${redirectLink}/search` : null,
  });
}
function handleConflictNotification(
  translations,
  push,
  isEditMode,
  redirectLink
) {
  NotificationSweet({
    title: translations.notification.warning.title,
    text: translations.notification.warning.text,
    type: translations.notification.warning.type,
    push: push || null,
    link: isEditMode ? `${redirectLink}/edit/${id}` : `${redirectLink}/create`,
  });
}

function handleWarningNotification(
  translations,
  push,
  isEditMode,
  redirectLink
) {
  NotificationSweet({
    title: translations.notification.warning.title,
    text: translations.notification.warning.text,
    type: translations.notification.warning.type,
    push: push || null,
    link:
      redirectLink && redirectLink.trim() !== ""
        ? isEditMode
          ? `${redirectLink}/edit/${id}`
          : `${redirectLink}/create`
        : null,
  });
}

function handleErrorNotification(translations, push, redirectLink) {
  NotificationSweet({
    title: translations.notification.error.title,
    text: translations.notification.error.text,
    type: translations.notification.error.type,
    push: push || null,
    link: redirectLink ? `${redirectLink}/search` : null,
  });
}
async function handleLoandingNotification(translations, isEditMode) {
  NotificationSweet({
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
}
