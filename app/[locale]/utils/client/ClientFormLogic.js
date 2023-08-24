import React from 'react';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import { clientApiUrl, apiHeaders } from "@/app/api/apiConfig";

export const handleClientInputChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const handleClientFormSubmit = async (
  formData,
  translations,
  push,
  isEditMode = false
) => {
  try {
    const url = isEditMode ? `${clientApiUrl}/${formData.cliId}` : `${clientApiUrl}`;
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
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      NotificationSweet({
        title: translations.notification.success.title,
        text: translations.notification.success.text,
        type: translations.notification.success.type,
        push: push,
        link: '/client/search',
      });
    } else if (response.status === 409) {
      NotificationSweet({
        title: translations.notification.warning.title,
        text: translations.client.clientNameExist,
        type: translations.notification.warning.type,
        push: push,
        link: isEditMode
          ? `/admin/client/edit/${formData.cliId}`
          : '/admin/client/create',
      });
    }
  } catch (error) {
    NotificationSweet({
      title: translations.notification.error.title,
      text: translations.notification.error.text,
      type: translations.notification.error.type,
      push: push,
      link: '/client/serach',
    });
    console.error('Error sending data:', error);
    // router.push('/admin/client/list');
  }
};
