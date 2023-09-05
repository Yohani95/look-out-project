import { personKamApiUrl,personContactApiUrl,personApiUrl } from "@/app/api/apiConfig";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";

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
      console.log(formData)
      const personDTO = {
        person: {
            perNombres: formData.perNombres,
            perApellidoPaterno: formData.perApellidoPaterno,
            perApellidoMaterno: formData.perApellidoMaterno,
            paiId: formData.paiId,
            tpeId: 3,
        },
        telefono:{

        },
        emai:{

        },
        cliId: formData.cliId
      };
      const url = isEditMode
        ? `${personApiUrl}/${formData.id}`
        : `${personApiUrl}`;
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
      console.log(response)
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
        console.log(response)
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
      console.error('Error fetching data:', error);
      return [];
    }
  };
  export const fetchPersonById = async (Id,t,setFormData,push) => {
    try {
      const response = await fetch(`${personApiUrl}/${Id}`);
      if (response.ok) {
        const result = await response.json();
        setFormData(result); // Suponiendo que los campos del formulario coinciden con los del cliente
      } else if (response.status == 404) {
        NotificationSweet({
          title: t.notification.warning.title,
          text: t.Common.notExist,
          type: t.notification.warning.type,
          push: push,
          link: "/account/search",
        });
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.notExist,
        type: t.notification.warning.type,
        push: push,
        link: "/account/search",
      });
    }
  };
  export const fetchPersonByContact = async () => {
    try {
      const response = await fetch(personContactApiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
  export const handleDelete = async (idClient,trans,fetchPerson) => {
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
        const response = await axios.delete(`${personApiUrl}/${idClient}`); // Utiliza Axios para hacer la solicitud DELETE
        // if (response.data.isSuccess) {
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
        console.log(error)
        NotificationSweet({
          title: trans.notification.error.title,
          text: trans.notification.error.text,
          type: trans.notification.error.type,
        });
      }
    }
  };
export const handleEdit = async (idPerson,trans,push) => {
  const confirmed = await ConfirmationDialog(
    trans.notification.edit.title,
    trans.notification.edit.text,
    trans.notification.edit.type,
    trans.notification.edit.buttonOk,
    trans.notification.edit.buttonCancel
  );
  if (confirmed) {
    push(`/contact/edit/${idPerson}`)
  }
};

export const fetchGetbyId= async (idPerson)=>{
  try {
    const response = await fetch(
      `${""}/${idPerson}`
    );
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const handleView=async(idPerson,push)=>{
  push(`/contact/view/${idPerson}`)
};

export const handleRelations=async()=>{
  try {
    const response = await fetch("");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
