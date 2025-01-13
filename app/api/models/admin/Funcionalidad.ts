import * as Yup from 'yup';

class Funcionalidad {
  id: number | null;
  nombre: string;
  descripcion: string | null;

  constructor(data?: any) {
    this.id = data?.id || null;
    this.nombre = data?.nombre || '';
    this.descripcion = data?.descripcion || null;
  }

  static getValidationSchema(t) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string().required(t.validationMessages.required),
      descripcion: Yup.string().nullable(),
    });
  }

  static createColumns(t) {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre',
        size: 200,
      },
      {
        accessorKey: 'descripcion',
        header: 'Descripción',
        size: 200,
      },
      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 100,
      },
    ];
  }
  getSelectOptions() {
    return {
      value: this.id,
      label: this.nombre,
    };
  }
  //     static Constantes = {
  //       CALIFICACION: 1,
  //       REUNION_PROGRAMADA: 2,
  //       PROPUESTA_EN_PREPARACION: 3,
  //       PROPUESTA_ENTREGADA_A_COMERCIAL: 4,
  //       PROPUESTA_ENVIADA_A_CLIENTE: 5,
  //       COMPROMETIDO: 6,
  //       CERRADA_PERDIDA: 7,
  //       CERRADA_GANADA: 8,
  //   };
}
export default Funcionalidad;
