import { clientApiUrl,apiHeaders } from "@/app/api/apiConfig";

export const handleDelete = async (clitId) => {
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
      const response = await axios.delete(`${clientApiUrl}/${clitId}`); // Utiliza Axios para hacer la solicitud DELETE
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
        text: "An error occurred while deleting.",
        type: "error",
      });
    }
  }
};
  