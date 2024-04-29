import React from 'react';
import Swal from 'sweetalert2';
const NotificationSweet = async ({ title, text, type, showLoading,push,link }) => {
  const options = {
    title,
    text,
    icon: type,
    showCancelButton: false, // Quitar el botón "Cancelar"
    showConfirmButton: !showLoading, // Mostrar botón "OK" solo si no está en estado de carga
    allowOutsideClick: !showLoading,
    confirmButtonColor: '#2F4BCE',
  };

  if (showLoading) {
    options.onOpen = () => {
      Swal.showLoading();
    };
  }

  Swal.fire(options).then((result) => {
    if (result.isConfirmed) {
      if(push!=null){
        push(link)
      }
    }
  });
};
/**
 * notificacion de error
 * @param {*} url direcion
 * @param {*} error mensaje de error
 */
 export const NotificationSweetError=async({url="",error})=>{
  NotificationSweet({
    title: t.notification.error.title,
    text: error,
    type: t.notification.error.type,
    push: router.push,
    link: url
  });
}

export default NotificationSweet;
