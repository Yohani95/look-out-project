import {
  personKamApiUrl,
  personContactApiUrl,
  personApiUrl,
  contacto,
  personContactCreateApiUrl,
  ClientePersonaEditApiUrl,
  personContactEditApiUrl,
  personContactDeleteApiUrl,
  personContactGetAllApiUrl,
  personContactByIdClientApiUrl,
  personGetAllContactDTOClientApiUrl
} from "@/app/api/apiConfig";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import axios from "axios";

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
      const personaDTO = {
        persona : {
          id:formData.id,
          perNombres: formData.perNombres,
          perApellidoPaterno: formData.perApellidoPaterno,
          perApellidoMaterno: formData.perApellidoMaterno,
          paiId: formData.paiId,
          perIdNacional: "1",
          perFechaNacimiento: formData.birth,
          tpeId: contacto
        },
        idCliente: formData.idCliente,
        emails: formData.emails,
        telefonos: formData.telefonos,
        direcciones: formData.direcciones
      };
      const url = isEditMode
        ? `${personContactEditApiUrl}/${formData.id}`
        : `${personContactCreateApiUrl}`;
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
        body: JSON.stringify(personaDTO),
      });
      if (response.ok) {
        NotificationSweet({
          title: translations.notification.success.title,
          text: translations.notification.success.text,
          type: translations.notification.success.type,
          push: push,
          link: "/contact/search",
        });
      } else if (response.status === 409) {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
          push: push,
          link: isEditMode
            ? `/contact/edit/${formData.cliId}`
            : "/contact/create",
        });
      } else {
        console.log(response);
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
          push: push,
          link: isEditMode
            ? `/contact/edit/${formData.cliId}`
            : "/contact/create",
        });
      }
    } catch (error) {
      NotificationSweet({
        title: translations.notification.error.title,
        text: translations.notification.error.text,
        type: translations.notification.error.type,
        push: push,
        link: "/contact/search",
      });
      console.error("Error sending data:", error);
      // router.push('');
    }
  };
export const fetchPerson = async () => {
  try {
    const response = await fetch(personKamApiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchPersonDTOContact = async () => {
  try {
    const response = await fetch(personGetAllContactDTOClientApiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchPersonById = async (Id, t, setFormData, push) => {
  try {
    const response = await fetch(`${ClientePersonaEditApiUrl}/${Id}`);
    if (response.ok) {
      const result = await response.json();
      result.data.persona.idCliente = result.data.idCliente;
      setFormData(result.data.persona); // Suponiendo que los campos del formulario coinciden con los del cliente
    } else if (response.status == 404) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.notExist,
        type: t.notification.warning.type,
        push: push,
        link: "/contact/search",
      });
    }
  } catch (error) {
    console.error("Error fetching client data:", error);
    NotificationSweet({
      title: t.notification.warning.title,
      text: t.Common.notExist,
      type: t.notification.warning.type,
      push: push,
      link: "/contact/search",
    });
  }
};
export const fetchPersonByContact = async () => {
  try {
    const response = await fetch(personContactGetAllApiUrl);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const handleDelete = async (idClient, trans, fetchPerson) => {
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
      const response = await axios.delete(`${personContactDeleteApiUrl}/${idClient}`); // Utiliza Axios para hacer la solicitud DELETE
      // if (response.data.isSuccess) {
      if (response.data.isSuccess) {
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
export const handleEdit = async (idPerson, trans, push) => {
  const confirmed = await ConfirmationDialog(
    trans.notification.edit.title,
    trans.notification.edit.text,
    trans.notification.edit.type,
    trans.notification.edit.buttonOk,
    trans.notification.edit.buttonCancel
  );
  if (confirmed) {
    push(`/contact/edit/${idPerson}`);
  }
};

export const fetchGetbyId = async (idPerson) => {
  try {
    const response = await fetch(`${""}/${idPerson}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchPersonGetbyIdClient = async (idClient) => {
  try {
    const response = await fetch(`${personContactByIdClientApiUrl}/${idClient}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const handleView = async (idPerson, push) => {
  push(`/contact/view/${idPerson}`);
};

export const handleRelations = async () => {
  try {
    const response = await fetch("");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
