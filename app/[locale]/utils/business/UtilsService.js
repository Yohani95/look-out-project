import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import {proyectoCreateAsyncApiUrl,proyectoLastIdApiUrl,proyectoApiUrl,proyectoGeFileApiUrl} from "@/app/api/apiConfig";
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
        pryId: formData.pryId,
        pryNombre: formData.pryNombre,
        prpId: 1,
        epyId: 1,
        tseId: formData.tseId,
        pryFechaInicioEstimada: formData.startDate,
        pryValor: 1,
        monId: 1,
        pryIdCliente: formData.cliId,
        pryFechaCierreEstimada: formData.endDate ,
        pryFechaCierre: formData.closeDate,
        pryIdContacto: formData.perId,
        pryIdContactoClave: formData.perId,
      };
      console.log(proyectoData);
      // Corrige los nombres de los campos
      data.append('proyectoJson', JSON.stringify(proyectoData));
  
      // Agrega los archivos
      data.append('files', formData.file1);
      data.append('files', formData.file2);

      const url = isEditMode
        ? `${proyectoUpdateAsyncApiUrl}/${formData.pryId}`
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
      console.log(response)
      if (response.ok) {
        NotificationSweet({
          title: translations.notification.success.title,
          text: translations.notification.success.text,
          type: translations.notification.success.type,
          push: push,
          link: "/business/closeServices/search",
        });
      } else if (response.status === 409) {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
          push: push,
          link: isEditMode
            ? `/business/closeServices/edit/${formData.cliId}`
            : "/business/closeServices/create",
        });
      } else {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
          push: push,
          link: isEditMode
            ? `/business/closeServices/edit/${formData.cliId}`
            : "/business/closeServices/create",
        });
      }
    } catch (error) {
      NotificationSweet({
        title: translations.notification.error.title,
        text: translations.notification.error.text,
        type: translations.notification.error.type,
        push: push,
        link: "/business/closeServices/search",
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
    push(`/business/closeServices/edit/${idService}`);
  }
};
export const fetchServiceById = async (Id, t, setFormData, push) => {
  try {
    const response = await fetch(`${proyectoApiUrl}/${Id}`);
    if (response.ok) {
      const result = await response.json();
      setFormData(result.data); // Suponiendo que los campos del formulario coinciden con los del cliente
    } else if (response.status == 404) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.notExist,
        type: t.notification.warning.type,
        push: push,
        link: "/business/closeServices/search",
      });
    }
  } catch (error) {
    console.error("Error fetching client data:", error);
    NotificationSweet({
      title: t.notification.warning.title,
      text: t.Common.notExist,
      type: t.notification.warning.type,
      push: push,
      link: "/business/closeServices/search",
    });
  }
};

export const fetchServiceLastId = async (t,push) => {
  try {
    const response = await fetch(`${proyectoLastIdApiUrl}`);
    if (response.ok) {
      const result = await response.json();
      return result; // Suponiendo que los campos del formulario coinciden con los del cliente
    } else if (response.status == 404) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.notExist,
        type: t.notification.warning.type,
        push: push,
        link: "/business/closeServices/search",
      });
    }
  } catch (error) {
    console.error("Error fetching client data:", error);
    NotificationSweet({
      title: t.notification.warning.title,
      text: t.Common.notExist,
      type: t.notification.warning.type,
      push: push,
      link: "/business/closeServices/search",
    });
  }
};

export const handleView = async (idService, push) => {
  push(`/business/closeServices/view/${idService}`);
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
export const fetchProyecto = async () => {
  try {
    const response = await fetch(`${proyectoApiUrl}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const downloadFiles = async (filePairs) => {
  for (const [path] of filePairs) {
    try {
      const url=`${proyectoGeFileApiUrl}?path=${encodeURIComponent(path)}`;
      const response = await fetch(url,{
        method: "GET",
        headers: {},
      });
      if (!response.ok) {
        throw new Error(`Error al descargar el archivo: ${path}`);
      }
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = path;
      a.style.display = 'none'; // Ocultar el enlace
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // Eliminar el enlace después de la descarga
    } catch (error) {
      console.error(`Error al descargar el archivo`, error);
    }
  }
};