import Swal from 'sweetalert2';

const ConfirmationDialog = async (title, message,type,btnok,btncancel) => {
  return new Promise((resolve) => {
    Swal.fire({
      title: title,
      text: message,
      icon: type,
      showCancelButton: true,
      confirmButtonColor: '#2F4BCE',
      cancelButtonColor: '#d33',
      confirmButtonText: btnok || "Ok",
      cancelButtonText: btncancel||'Cancel',
    }).then((result) => {
      resolve(result.isConfirmed);
    });
  });
};

export default ConfirmationDialog;
