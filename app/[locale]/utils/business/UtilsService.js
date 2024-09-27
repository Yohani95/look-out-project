import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
import {
  proyectoCreateAsyncApiUrl,
  proyectoUpdateAsyncApiUrl,
  proyectoLastIdApiUrl,
  proyectoApiUrl,
  proyectoGeFileApiUrl,
  proyectoDocumentoByIdApiUrl,
  proyectoDeleteAsyncApiUrl,
  proyectoWithEntitiesApiUrl,
  proyectoByIdWithEntitiesApiUrl,
} from '@/app/api/apiConfig';
import { fetchPersonGetbyIdClient } from '@/app/[locale]/utils/person/UtilsPerson';
import { fetchByIdProyecto } from '@/app/[locale]/utils/business/tarifario/UtilsTarifario';
import { fetchMoneda } from '@/app/[locale]/utils/country/moneda/UtilsMoneda';
import { fetchPerfil } from '@/app/[locale]/utils/admin/perfil/UtilsPerfil';
import fetchCountriest from '@/app/[locale]/utils/country/Countrylist';
import { fetchTypeService } from '@/app/[locale]/utils/project/tipoServicio/UtilsTypeService';
import { differenceInMonths, differenceInCalendarMonths } from 'date-fns';
import Proyecto from '@/app/api/models/proyecto/Proyecto';
import { fechtClients } from '@/app/[locale]/utils/client/ClientFormLogic';
export const handleInputChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
export const handleFormSubmit = async (
  formData,
  translations,
  push,
  isEditMode = false
) => {
  //event.preventDefault();
  try {
    const url = isEditMode
      ? `${proyectoUpdateAsyncApiUrl}/${formData.pryId}`
      : `${proyectoCreateAsyncApiUrl}`;
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
      headers: {},
      body: formData,
    });
    if (response.ok) {
      NotificationSweet({
        title: translations.notification.success.title,
        text: translations.notification.success.text,
        type: translations.notification.success.type,
        push: push,
        link: '/business/closeServices/search',
      });
    } else if (response.status === 409) {
      NotificationSweet({
        title: translations.notification.warning.title,
        text: translations.notification.warning.text,
        type: translations.notification.warning.type,
        push: push,
        link: isEditMode
          ? `/business/closeServices/edit/${formData.cliId}`
          : '/business/closeServices/create',
      });
    } else {
      NotificationSweet({
        title: translations.notification.error.title,
        text: translations.notification.error.text,
        type: translations.notification.error.type,
        push: push,
        link: isEditMode
          ? `/business/closeServices/edit/${formData.cliId}`
          : '/business/closeServices/create',
      });
    }
  } catch (error) {
    NotificationSweet({
      title: translations.notification.error.title,
      text: translations.notification.error.text,
      type: translations.notification.error.type,
      push: push,
      link: '/business/closeServices/search',
    });
    console.error('Error sending data:', error);
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
      text: '',
      type: trans.notification.loading.type,
      showLoading: true,
    });
    try {
      const response = await fetch(
        `${proyectoDeleteAsyncApiUrl}/${idService}`,
        {
          method: 'DELETE',
        }
      ); // Utiliza Axios para hacer la solicitud DELETE
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
export const fetchServiceById = async (id, t, push) => {
  try {
    const response = await fetch(`${proyectoByIdWithEntitiesApiUrl}/${id}`, {
      cache: 'no-cache',
    });
    if (response.ok) {
      const resultData = await response.json();
      const result = resultData.data;
      let proyecto = new Proyecto(result);
      const monthsDifference = differenceInMonths(
        proyecto.pryFechaCierreEstimada,
        proyecto.pryFechaInicioEstimada
      );
      // Redondear el valor de meses a entero
      proyecto.months = Math.round(monthsDifference);
      //obtener documentos
      const documentos = await fetchProyectoDocumentoById(result.pryId);
      const archivos = [];
      for (let i = 0; i < documentos.length; i++) {
        const documento = documentos[i];
        const url = `${proyectoGeFileApiUrl}?path=${encodeURIComponent(
          documento.docUrl
        )}`;
        archivos.push({
          documento: documento,
          nombre: documento.docNombre,
          url, // Solo pasamos la URL
        });
      }
      // Asegurar que archivos es un arreglo
      return { proyecto, archivos: archivos || [] };
    } else if (response.status == 404) {
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.notExist,
        type: t.notification.warning.type,
        push: push,
        link: '/business/closeServices/search',
      });
    }
  } catch (error) {
    console.error('Error fetching client data:', error);
    NotificationSweet({
      title: t.notification.error.title,
      text: t.notification.error.text,
      type: t.notification.error.type,
      push: push,
      link: '/business/closeServices/search',
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
        link: '/business/closeServices/search',
      });
    }
  } catch (error) {
    console.error('Error fetching client data:', error);
    NotificationSweet({
      title: t.notification.warning.title,
      text: t.Common.notExist,
      type: t.notification.warning.type,
      push: push,
      link: '/business/closeServices/search',
    });
  }
};

export const handleView = async (idService, push) => {
  push(`/business/closeServices/view/${idService}`);
};
export const GetLastIdProjecService = async () => {
  try {
    const response = await fetch('');
    if (response.status == 404) {
      return null;
    }
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
export const fetchProyecto = async () => {
  try {
    const response = await fetch(`${proyectoWithEntitiesApiUrl}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
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
    console.error('Error fetching data:', error);
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
  console.log(documentos);

  if (!documentos || documentos.length === 0) {
    // Mostrar notificación de que no hay documentos (urls es nulo o un arreglo vacío)
    NotificationSweet({
      title: translations.notification.files.title,
      text: translations.Common.noDocument,
      type: translations.notification.files.type,
    });
    return;
  }
  for (const documento of documentos) {
    try {
      const url = `${proyectoGeFileApiUrl}?path=${encodeURIComponent(
        documento.docUrl
      )}`;
      console.log(url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {},
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error al descargar el archivo: ${documento.docUrl}`);
      }
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = documento.docNombre;
      a.style.display = 'none'; // Ocultar el enlace
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
export const GetData = async () => {
  try {
    const [monedas, perfiles, paises, tipoServicios, clientes] =
      await Promise.all([
        fetchMoneda(),
        fetchPerfil(),
        fetchCountriest(),
        fetchTypeService(),
        fechtClients(),
      ]);

    const mappedMonedas = monedas.map((moneda) => ({
      value: moneda.monId,
      label: moneda.monNombre,
    }));

    const mappedPerfiles = perfiles.map((perfil) => ({
      value: perfil.id,
      label: perfil.prf_Nombre + ' ' + perfil.prf_Descripcion,
    }));

    const mappedPaises = paises.map((country) => ({
      value: country.paiId,
      label: country.paiNombre,
    }));

    const mappedTipoServicios = tipoServicios.map((item) => ({
      value: item.tseId,
      label: `${item.tseNombre} ${item.tseDescripcion} `,
    }));

    const mappedclientes = clientes.map((item) => ({
      value: item.cliId,
      label: item.cliNombre,
    }));

    return {
      monedas: mappedMonedas,
      perfiles: mappedPerfiles,
      paises: mappedPaises,
      tipoServicios: mappedTipoServicios,
      clientes: mappedclientes,
    };
  } catch (error) {
    // Manejo de errores si alguna de las operaciones falla
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};
