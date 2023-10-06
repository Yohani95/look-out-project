import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import {
  proyectoCreateAsyncApiUrl,
  proyectoLastIdApiUrl,
  proyectoApiUrl,
  proyectoGeFileApiUrl,
  proyectoDocumentoByIdApiUrl,
  proyectoDeleteAsyncApiUrl
} from "@/app/api/apiConfig";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
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
        pryFechaCierreEstimada: formData.endDate,
        pryFechaCierre: formData.closeDate,
        pryIdContacto: formData.perId,
        pryIdContactoClave: formData.perId,
      };
      // Corrige los nombres de los campos
      data.append("proyectoJson", JSON.stringify(proyectoData));

      // Agrega los archivos
      data.append("files", formData.file1);
      data.append("files", formData.file2);

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
      const response = await fetch(`${proyectoDeleteAsyncApiUrl}/${idService}`, {
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
      result.startDate = new Date(result.pryFechaInicioEstimada);
      result.closeDate = new Date(result.pryFechaCierre);
      const endDate =new Date(result.pryFechaCierreEstimada)
      const timeDifference = endDate.getTime() - result.startDate .getTime(); 
      const monthsDifference = timeDifference / (1000 * 60 * 60 * 24 * 30.44); 
      // Redondear el valor de meses a entero
      result.months = Math.round(monthsDifference);
      //obtener documentos 
      const documentos = await fetchProyectoDocumentoById(result.pryId);
      for (let i = 0; i < documentos.length; i++) {
        const documento = documentos[i];
        const url = `${proyectoGeFileApiUrl}?path=${encodeURIComponent(documento.docUrl)}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {},
        });
      
        if (response.ok) {
          const blob = await response.blob();
          // Asigna el documento al resultado con el nombre correspondiente (file1, file2, etc.)
          result[`file${i + 1}`] = new File([blob], documento.docNombre);
        }
      }
      setFormData(result); // Suponiendo que los campos del formulario coinciden con los del cliente
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
      title: t.notification.error.title,
      text: t.notification.error.text,
      type: t.notification.error.type,
      push: push,
      link: "/business/closeServices/search",
    });
  }
};

export const fetchServiceLastId = async (t, push) => {
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
export const fetchProyectoDocumentoById = async (id) => {
  try {
    const response = await fetch(`${proyectoDocumentoByIdApiUrl}/${id}`);
    const data = await response.json();
    const documento = data.map((element) => element.documento);
    return documento;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const downloadFiles = async (id, translations) => {
  const confirmed = await ConfirmationDialog(
    translations.notification.files.title,
    translations.notification.files.text,
    translations.notification.files.type,
    translations.notification.files.buttonOk,
    translations.notification.files.buttonCancel
  );
  if (confirmed != true) {
    return;
  }
  const documentos = await fetchProyectoDocumentoById(id);

  if (!documentos || documentos.length === 0) {
    // Mostrar notificación de que no hay documentos (urls es nulo o un arreglo vacío)
    NotificationSweet({
      title: translations.notification.warning.title,
      text: translations.client.clientNameExist,
      type: translations.notification.warning.type,
      push: push,
      link: "",
    });
    return;
  }
  for (const documento of documentos) {
    try {
      const url = `${proyectoGeFileApiUrl}?path=${encodeURIComponent(
        documento.docUrl
      )}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {},
      });
      if (!response.ok) {
        throw new Error(`Error al descargar el archivo: ${documento.docUrl}`);
      }
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = documento.docNombre;
      a.style.display = "none"; // Ocultar el enlace
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // Eliminar el enlace después de la descarga
    } catch (error) {
      console.error(`Error al descargar el archivo`, error);
      NotificationSweet({
        title: translations.notification.error.title,
        text: translations.notification.error.text,
        type: translations.notification.error.type,
      });
    }
  }
};
