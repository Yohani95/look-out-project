import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import axios from "axios";
import {
  phoneApiUrl,
  phoneCreateApiUrl,
  phoneEditApiUrl,
  phoneTypeApiUrl,
  phoneByIdPersonApiUrl,
  phoneEntitiesApiUrl ,
} from "@/app/api/apiConfig";
export const handleInputChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
export const fetchPhoneType = async () => {
  try {
    const response = await fetch(phoneTypeApiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const handleFormSubmit =
  (formData, translations, push, isEditMode = false) =>
  async (event) => {
    event.preventDefault();
    try {
      const url = isEditMode
        ? `${phoneEditApiUrl}/${formData.telId}`
        : `${phoneCreateApiUrl}`;
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        NotificationSweet({
          title: translations.notification.success.title,
          text: translations.notification.success.text,
          type: translations.notification.success.type,
          push: push,
          link: "/admin/phone/search",
        });
      } else if (response.status === 409) {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
          push: push,
          link: isEditMode
            ? `/admin/phone/edit/${formData.cliId}`
            : "/admin/phone/create",
        });
      } else {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
          push: push,
          link: isEditMode
            ? `/admin/phone/edit/${formData.cliId}`
            : "/admin/phone/create",
        });
      }
    } catch (error) {
      NotificationSweet({
        title: translations.notification.error.title,
        text: translations.notification.error.text,
        type: translations.notification.error.type,
        push: push,
        link: "/admin/phone/search",
      });
      console.error("Error sending data:", error);
      // router.push('');
    }
  };
export const handleDelete = async (idPhone, trans, fetchPerson) => {
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
      const response = await fetch(`${phoneApiUrl}/${idPhone}`,{
        method: "DELETE"}); // Utiliza Axios para hacer la solicitud DELETE
      if (response.ok) {
        NotificationSweet({
          title: trans.notification.success.title,
          text: trans.notification.success.text,
          type: trans.notification.success.type,
        });
        // Actualiza la lista de usuarios después de eliminar
        fetchPerson();
      } else {
        NotificationSweet({
          title: trans.notification.error.title,
          text: trans.notification.error.text,
          type: trans.notification.error.type,
        });
      }
    } catch (error) {
      console.log(error);
      NotificationSweet({
        title: trans.notification.error.title,
        text: trans.notification.error.text,
        type: trans.notification.error.type,
      });
    }
  }
};
export const handleEdit = async (idPhone, trans, push) => {
  const confirmed = await ConfirmationDialog(
    trans.notification.edit.title,
    trans.notification.edit.text,
    trans.notification.edit.type,
    trans.notification.edit.buttonOk,
    trans.notification.edit.buttonCancel
  );
  if (confirmed) {
    push(`/admin/phone/edit/${idPhone}`);
  }
};
export const fetchPhoneById = async (Id, t, setFormData, push) => {
  try {
    const response = await fetch(`${phoneApiUrl}/${Id}`);
    if (response.ok) {
      const result = await response.json();
      setFormData(result); // Suponiendo que los campos del formulario coinciden con los del cliente
    } else if (response.status == 404) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.notExist,
        type: t.notification.warning.type,
        push: push,
        link: "/admin/phone/search",
      });
    }
  } catch (error) {
    console.error("Error fetching client data:", error);
    NotificationSweet({
      title: t.notification.erro.title,
      text: t.notification.error.text,
      type: t.notification.error.type,
      push: push,
      link: "/admin/phone/search",
    });
  }
};
export const fetchPhoneByIdPerson = async (IdPerson, t) => {
  try {
    const response = await fetch(`${phoneByIdPersonApiUrl}/${IdPerson}`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else if (response.status == 404) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.notification.warning.text,
        type: t.notification.warning.type,
      });
    }
  } catch (error) {
    console.error("Error fetching client data:", error);
    NotificationSweet({
      title: t.notification.error.title,
      text: t.notification.error.text,
      type: t.notification.error.type,
    });
  }
};
export const handleView = async (idPhone, push) => {
  push(`/admin/phone/view/${idPhone}`);
};
export const fetchPhone = async () => {
  try {
    const response = await fetch(phoneEntitiesApiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
