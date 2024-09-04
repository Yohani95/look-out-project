import React from 'react';
import Swal, { SweetAlertOptions } from 'sweetalert2';
interface NotificationSweetProps {
  title: string;
  text: string;
  type: 'success' | 'error' | 'warning' | 'info';
  showLoading?: boolean;
  push?: (href: string, options?: any) => void;
  link?: string;
  goBack?: () => void;
}

const NotificationSweet = async ({
  title,
  text,
  type,
  showLoading = false,
  push,
  link,
  goBack = null,
}: NotificationSweetProps) => {
  const options: SweetAlertOptions = {
    title,
    text,
    icon: type,
    showCancelButton: false, //!showLoading && (link !== undefined), // Mostrar botón "Volver atrás" si no está cargando y link no es undefined
    cancelButtonText: 'Volver atrás',
    confirmButtonColor: '#2F4BCE',
    cancelButtonColor: '#d33',
    showConfirmButton: !showLoading, // Mostrar botón "OK" solo si no está cargando
    allowOutsideClick: !showLoading,
    willOpen: () => {
      if (showLoading) {
        Swal.showLoading();
      }
    },
  };

  Swal.fire(options).then((result) => {
    if (result.isDismissed) {
      if (push && link) {
        // Si el usuario presiona el botón "OK" (cuando esté disponible) y link no está vacío, realizar la redirección
        push(link);
      } else {
        if (goBack) goBack();
      }
    } else if (result.isConfirmed) {
      if (goBack) goBack();
    }
  });
};
/**
 * notificacion de error
 * @param {*} url direcion
 * @param {*} error mensaje de error
 */
export const NotificationSweetError = async ({ url = '', error }) => {
  // NotificationSweet({
  //   title: t.notification.error.title,
  //   text: error,
  //   type: t.notification.error.type,
  //   push: router.push,
  //   link: url,
  // });
};

export default NotificationSweet;
