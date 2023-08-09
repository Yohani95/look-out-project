import Swal from 'sweetalert2';

export const handleDelete = (itemName, onDelete) => {
  Swal.fire({
    title: `¿Estás seguro de eliminar ${itemName}?`,
    text: `Una vez eliminado, no podrás recuperar los datos Eliminar ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete(); // Llama a la función onDelete pasada como argumento
      Swal.fire(
        'Eliminado',
        `${itemName} ha sido eliminado correctamente`,
        'success'
      );
    }
  });
};
