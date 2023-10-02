import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import {proyectoCreateAsyncApiUrl,proyectoLastIdApiUrl} from "@/app/api/apiConfig";
export const handleInputChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
export const handleFormSubmit =
  (formData, translations, push, isEditMode = false) =>
  async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      // Agrega los campos de formulario
      const proyectoData = {
        pryNombre: "P1",
        prpId: 1,
        epyId: 1,
        tseId: 1,
        pryFechaInicioEstimada: "2023-09-26T00:00:00",
        pryValor: 1,
        monId: 1,
        pryIdCliente: 1,
        pryFechaCierreEstimada: "2023-09-26T00:00:00",
        pryFechaCierre: "2023-09-26T00:00:00",
        pryIdContacto: 1,
        pryIdContactoClave: 1,
      };
      // Corrige los nombres de los campos
      data.append('proyecto', JSON.stringify(proyectoData));
  
      // Agrega los archivos
      data.append('fil-e1', formData.file1);
      data.append('file2', formData.file2);

      const url = isEditMode
        ? `${""}/${formData.id}`
        : `${"https://localhost:44318/api/Proyecto/createAsync"}`;
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
      console.log(response)
      if (response.ok) {
        NotificationSweet({
          title: translations.notification.success.title,
          text: translations.notification.success.text,
          type: translations.notification.success.type,
          push: push,
          link: "/contact/address/search",
        });
      } else if (response.status === 409) {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
          push: push,
          link: isEditMode
            ? `/contact/address/edit/${formData.cliId}`
            : "/contact/address/create",
        });
      } else {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
          push: push,
          link: isEditMode
            ? `/contact/address/edit/${formData.cliId}`
            : "/contact/address/create",
        });
      }
    } catch (error) {
      NotificationSweet({
        title: translations.notification.error.title,
        text: translations.notification.error.text,
        type: translations.notification.error.type,
        push: push,
        link: "/contact/address/search",
      });
      console.error("Error sending data:", error);
      // router.push('');
    }
  };

export const handleDelete = async (idService, trans, fetchService) => {
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
      const response = await fetch(`${""}/${idService}`, {
        method: "DELETE",
      }); // Utiliza Axios para hacer la solicitud DELETE
      if (response.ok) {
        NotificationSweet({
          title: trans.notification.success.title,
          text: trans.notification.success.text,
          type: trans.notification.success.type,
        });
        // Actualiza la lista de usuarios después de eliminar
        fetchService();
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
export const handleEdit = async (idService, trans, push) => {
  const confirmed = await ConfirmationDialog(
    trans.notification.edit.title,
    trans.notification.edit.text,
    trans.notification.edit.type,
    trans.notification.edit.buttonOk,
    trans.notification.edit.buttonCancel
  );
  if (confirmed) {
    push(`/contact/address/${idService}`);
  }
};
export const fetchServiceById = async (Id, t, setFormData, push) => {
  try {
    const response = await fetch(`${""}/${Id}`);
    if (response.ok) {
      const result = await response.json();
      setFormData(result.data); // Suponiendo que los campos del formulario coinciden con los del cliente
    } else if (response.status == 404) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.notExist,
        type: t.notification.warning.type,
        push: push,
        link: "//search",
      });
    }
  } catch (error) {
    console.error("Error fetching client data:", error);
    NotificationSweet({
      title: t.notification.warning.title,
      text: t.Common.notExist,
      type: t.notification.warning.type,
      push: push,
      link: "//search",
    });
  }
};

export const fetchServiceLastId = async (Id, t, setFormData, push) => {
  try {
    const response = await fetch(`${proyectoLastIdApiUrl}`);
    if (response.ok) {
      const result = await response.json();
      setFormData(result.data); // Suponiendo que los campos del formulario coinciden con los del cliente
    } else if (response.status == 404) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.notExist,
        type: t.notification.warning.type,
        push: push,
        link: "//search",
      });
    }
  } catch (error) {
    console.error("Error fetching client data:", error);
    NotificationSweet({
      title: t.notification.warning.title,
      text: t.Common.notExist,
      type: t.notification.warning.type,
      push: push,
      link: "//search",
    });
  }
};

export const handleView = async (idService, push) => {
  push(`//view/${idService}`);
};
export const GetLastIdProjecService = async () => {
  try {
    const response = await fetch("");
    if (response.status == 404) {
      return null;
    }
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
