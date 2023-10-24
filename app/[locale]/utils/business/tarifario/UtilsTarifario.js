import { tarifarioGetByIdProyectoApiUrl } from "@/app/api/apiConfig";
export const fetchByIdProyecto = async (id) => {
    try {
      const response = await fetch(tarifarioGetByIdProyectoApiUrl+"/"+id);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  export const handleFormSubmit =
  (formData, translations, push, isEditMode = false) =>
  async (event) => {
    event.preventDefault();
    try {
      const url = isEditMode
        ? `${proyectoUpdateAsyncApiUrl}/${formData.tcId}`//falta id
        : `${proyectoCreateAsyncApiUrl}`;
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
        headers: {},
        body: data,
      });
      if (response.ok) {
        NotificationSweet({
          title: translations.notification.success.title,
          text: translations.notification.success.text,
          type: translations.notification.success.type,
          push: push,
          link: "//search",
        });
      } else if (response.status === 409) {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
          push: push,
          link: isEditMode
            ? `//edit/${formData.cliId}`
            : "//create",
        });
      } else {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
          push: push,
          link: isEditMode
            ? `//edit/${formData.cliId}`
            : "//create",
        });
      }
    } catch (error) {
      NotificationSweet({
        title: translations.notification.error.title,
        text: translations.notification.error.text,
        type: translations.notification.error.type,
        push: push,
        link: "//search",
      });
      console.error("Error sending data:", error);
      // router.push('');
    }
  };

  export const handleDelete = async (id, trans, fetch) => {
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
        const response = await fetch(
          `${""}/${id}`,
          {
            method: "DELETE",
          }
        ); 
        if (response.ok) {
          NotificationSweet({
            title: trans.notification.success.title,
            text: trans.notification.success.text,
            type: trans.notification.success.type,
          });
          fetch();
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