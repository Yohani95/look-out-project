import React from 'react';
import { useRouter } from 'next/navigation'
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import { userApiUrl,apiHeaders } from "@/app/api/apiConfig";
export const handleInputChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const handleSubmit = (formData, setFormData,translations,push , userId,isEditMode = false ) => async (event) => {
  event.preventDefault();
  if(formData.usu_contraseña!=formData.usu_contraseña2){
    NotificationSweet({
      title: translations.notification.warning.title,
      text: translations.Common.passwordMismatch,
      type: translations.notification.warning.type,
    });
    return;
  }
 try {
    const url = isEditMode ? `${userApiUrl}/${userId}` : `${userApiUrl}`;
    const method = isEditMode ? 'PUT' : 'POST';
    await NotificationSweet({
       title: isEditMode ? translations.notification.loading.title : translations.notification.create.title,
      text: isEditMode ? translations.notification.loading.text : translations.notification.create.text,
      type: isEditMode ? translations.notification.loading.type : translations.notification.create.type,
     showLoading: true,
    });
    const response = await fetch(url, {
      method: method ,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    // Agregar lógica adicional si es necesario
    if(response.ok){
        NotificationSweet({
          title: translations.notification.success.title,
          text: translations.notification.success.text,
          type: translations.notification.success.type,
          push: push,
          link:'/admin/user/list'
        });
    }else if(response.status==409){
      NotificationSweet({
        title: translations.notification.warning.title,
        text: translations.user.userNameExist,
        type: translations.notification.warning.type,
        push: push,
        link: isEditMode ? `/admin/user/edit/${userId}` : '/admin/user/create'
      });
    }  
  } catch (error) {
    NotificationSweet({
      title: translations.notification.error.title,
      text: translations.notification.error.text,
      type: translations.notification.error.type,
      push: push,
      link:'/admin/user/list'
    });
    console.error('Error sending data:', error);
    // router.push('/admin/user/list');
  }
};
