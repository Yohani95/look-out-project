import React from 'react';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
import {
  clientApiUrl,
  clientCreateApiUrl,
  apiHeaders,
  clientDeleteApiUrl,
  clientUpdatepiUrl,
  clientWithEntitiesApiUrl,
  clientWithDTOApiUrl,
  ClientePersonaGetAllApiUrl,
} from '@/app/api/apiConfig';
import axios from 'axios';
import Utils from '@/app/api/models/common/Utils';
export const handleClientInputChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const handleClientFormSubmit =
  (formData, translations, push, isEditMode = false) =>
  async (event) => {
    event.preventDefault();
    try {
      const clienteWithIds = {
        cliente: {
          cliId: formData.cliId,
          cliNombre: formData.cliNombre,
          cliDescripcion: formData.cliDescripcion,
          eclId: formData.eclId,
          paiId: formData.paiId,
          secId: formData.secId,
          girId: formData.girId,
          cliSitioWeb: formData.cliSitioWeb,
          cliNif: formData.cliNif,
        },
        idPerson: formData.idPerson,
        kamIdPerson: {
          Id: formData.kamId,
        },
      };
      console.log(clienteWithIds);
      const url = isEditMode
        ? `${clientUpdatepiUrl}/${formData.cliId}`
        : `${clientCreateApiUrl}`;
      const method = isEditMode ? 'PUT' : 'POST';
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteWithIds),
      });
      if (response.ok) {
        Utils.handleSuccessNotification(translations, push);
        // NotificationSweet({
        //   title: translations.notification.success.title,
        //   text: translations.notification.success.text,
        //   type: translations.notification.success.type,
        //   push: push,
        //   link: '/account/search',
        // });
      } else if (response.status === 409) {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
          push: push,
          link: isEditMode
            ? `/account/edit/${formData.cliId}`
            : '/account/create',
        });
      } else {
        console.log(response);
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
          push: push,
          link: isEditMode
            ? `/account/edit/${formData.cliId}`
            : '/account/create',
        });
      }
    } catch (error) {
      NotificationSweet({
        title: translations.notification.error.title,
        text: translations.notification.error.text,
        type: translations.notification.error.type,
        push: push,
        link: '/account/search',
      });
      console.error('Error sending data:', error);
      // router.push('');
    }
  };

export const handleClienteDelete = async (idClient, trans, fechtClients) => {
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
      text: '',
      type: trans.notification.loading.type,
      showLoading: true,
    });
    try {
      const response = await axios.delete(`${clientDeleteApiUrl}/${idClient}`); // Utiliza Axios para hacer la solicitud DELETE
      if (response.data.isSuccess) {
        NotificationSweet({
          title: trans.notification.success.title,
          text: trans.notification.success.text,
          type: trans.notification.success.type,
        });
        // Actualiza la lista de usuarios después de eliminar
        fechtClients();
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
export const handleEdit = async (userId, trans, push) => {
  const confirmed = await ConfirmationDialog(
    trans.notification.edit.title,
    trans.notification.edit.text,
    trans.notification.edit.type,
    trans.notification.edit.buttonOk,
    trans.notification.edit.buttonCancel
  );
  if (confirmed) {
    push(`/account/edit/${userId}`);
  }
};

export const fetchGetbyId = async (idClient) => {
  try {
    const response = await fetch(`${clientApiUrl}/${idClient}`);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const handleView = async (idClient, push) => {
  push(`/account/view/${idClient}`);
};

export const handleRelations = async () => {
  try {
    const response = await fetch('');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const fechtClients = async () => {
  try {
    const response = await axios.get(clientWithDTOApiUrl, {
      headers: apiHeaders,
    });
    const modifiedData = response.data.map((item) => ({
      ...item,
      cliId: item.cliente.cliId,
      cliNombre: item.cliente.cliNombre,
      sectorComercial: item.cliente.sectorComercial.secNombre,
      pais: item.cliente.pais.paiNombre,
      email: item.email || 'N/A',
    }));
    return modifiedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
export const fetchClientsRelations = async () => {
  try {
    const response = await axios.get(ClientePersonaGetAllApiUrl, {
      headers: apiHeaders,
    });
    const modifiedData = response.data.data.map((item) => ({
      id: item.cliente.cliId,
      kam: item.persona
        ? `${item.persona.perNombres} ${item.persona.perApellidoPaterno}`
        : 'N/A',
      paiNombre: item.cliente.pais.paiNombre,
      cliNombre: item.cliente.cliNombre,
      secNombre: item.cliente.sectorComercial.secNombre,
    }));
    return modifiedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
