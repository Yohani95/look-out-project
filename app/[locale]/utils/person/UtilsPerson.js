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
  personGetAllContactDTOClientApiUrl,
} from "@/app/api/apiConfig";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import axios from "axios";
export const handleInputChange =
  (formData, setFormData) => (event) => {
    
    const { name, value } = event.target;

    // Divide el nombre del campo en partes separadas por punto
    const nameParts = name.split('.');

    // Crea una copia del estado actual de formData para no mutar el estado directamente
    const updatedFormData = { ...formData };
  
    // Utiliza una referencia temporal para navegar por la estructura anidada
    let tempRef = updatedFormData;
  
    // Itera sobre las partes del nombre para llegar al nivel correcto
    for (let i = 0; i < nameParts.length - 1; i++) {
      tempRef = tempRef[nameParts[i]] || {};
    }
  
    // Actualiza la propiedad específica
    tempRef[nameParts[nameParts.length - 1]] = value;
  
    // Actualiza el estado de formData con la nueva estructura
    setFormData(updatedFormData);
 
 
  };

export const handleFormSubmit =
  (formData, translations, push, isEditMode = false) =>
  async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      const url = isEditMode
        ? `${personContactEditApiUrl}/${formData.persona.id}`
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
        body: JSON.stringify(formData),
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
      setFormData((prevData) => ({
        ...prevData,
        persona: result.data.persona,
        idCliente: result.data.idCliente,
      }));
      // Suponiendo que los campos del formulario coinciden con los del cliente
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
      const response = await axios.delete(
        `${personContactDeleteApiUrl}/${idClient}`
      ); // Utiliza Axios para hacer la solicitud DELETE
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
export const handleEdit = async (idPerson, idClient, trans, push) => {
  const confirmed = await ConfirmationDialog(
    trans.notification.edit.title,
    trans.notification.edit.text,
    trans.notification.edit.type,
    trans.notification.edit.buttonOk,
    trans.notification.edit.buttonCancel
  );
  if (confirmed) {
    push(`/contact/edit/${idClient}/${idPerson}`);
  }
};

export const fetchPersonGetbyIdClient = async (idClient) => {
  try {
    const response = await fetch(
      `${personContactByIdClientApiUrl}/${idClient}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const handleView = async (idPerson, idClient, push) => {
  push(`/contact/view/${idClient}/${idPerson}`);
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
/*
_____________________________________________________

***************Fetch Person**********************
_____________________________________________________

*/
export const fetchAllPerson=async () =>{
  try {
    const response = await fetch(`${personApiUrl}`,{cache:"no-cache"});
    const data =await  response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export const fetchGetbyId = async (idPerson) => {
  try {
    const response = await fetch(`${personApiUrl}/${idPerson}`);
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
/*
_____________________________________________________

***************Fetch Professionals Person **********************
_____________________________________________________

*/
export const handleViewProfessional = async (idPerson, push) => {
  push(`/admin/professional/view/${idPerson}`);
};
export const handleEditProfessional = async (idPerson, trans, push) => {
  const confirmed = await ConfirmationDialog(
    trans.notification.edit.title,
    trans.notification.edit.text,
    trans.notification.edit.type,
    trans.notification.edit.buttonOk,
    trans.notification.edit.buttonCancel
  );
  if (confirmed) {
    push(`/admin/professional/edit/${idPerson}`);
  }
};