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