export const handleInputChange = (formData, setFormData) => (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  export const handleSelectChange = (event, fieldName,setFormData) => {
    const selectedValue = event.target.value;
    console.log(`Selected ${fieldName}:`, selectedValue);
    setFormData((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
  };

  export const handleFormSubmit =
  (formData, translations, push, isEditMode = false,redirectLink,apiUrl,id) =>
  async (event) => {
    event.preventDefault();
    try {
      await handleLoandingNotification(translations)
      const url = isEditMode
        ? `${apiUrl.edit}/${id}`
        : `${apiUrl.create}`;
      const method = isEditMode ? "PUT" : "POST";
      const response = await fetch(url, {
        method: method,
        headers: {},
        body: formData,
      });
      if (response.ok) {
        handleSuccessNotification(translations, push,redirectLink);
      } else if (response.status === 409) {
        handleConflictNotification(translations, push, isEditMode,redirectLink);
      } else {
        handleWarningNotification(translations, push, isEditMode,redirectLink);
      }
    } catch (error) {
      handleErrorNotification(translations, push);
      console.error("Error sending data:", error);
    }
  };
  /*
   =================================================================================
   Funciones de utilidad PARA SWEETALERT, ESTAS SON GENERICAS PARA SER REUTILIZADAS
   =================================================================================
*/
  function handleSuccessNotification(translations, push,redirectLink) {
    NotificationSweet({
      title: translations.notification.success.title,
      text: translations.notification.success.text,
      type: translations.notification.success.type,
      push: push,
      link: `/${redirectLink}/search`,
    });
  }
  function handleConflictNotification(translations, push, isEditMode,redirectLink) {
    NotificationSweet({
      title: translations.notification.warning.title,
      text: translations.notification.warning.text,
      type: translations.notification.warning.type,
      push: push,
      link: isEditMode ? `/${redirectLink}/edit/${id}` : `/${redirectLink}/create`,
    });
  }
  
  function handleWarningNotification(translations, push, isEditMode,redirectLink) {
    NotificationSweet({
      title: translations.notification.warning.title,
      text: translations.notification.warning.text,
      type: translations.notification.warning.type,
      push: push,
      link: isEditMode ? `/${redirectLink}/edit/${id}` : `/${redirectLink}/create`,
    });
  }
  
  function handleErrorNotification(translations, push,redirectLink) {
    NotificationSweet({
      title: translations.notification.error.title,
      text: translations.notification.error.text,
      type: translations.notification.error.type,
      push: push,
      link: `/${redirectLink}/search`,
    });
  }
  async function handleLoandingNotification(translations) {
   NotificationSweet({
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
  }