import * as Yup from 'yup';

class Industria {
  id: number | null;
  nombre: string | null;
  detalle: string | null;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.nombre = data?.nombre || null;
    this.detalle = data?.detalle || null;
  }

  // Método para obtener el esquema de validación usando Yup
  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string()
        .max(100, `${t.ValidationMessages.maxLength}, 100 max`)
        .nullable(),
      detalle: Yup.string()
        .max(200, `${t.ValidationMessages.maxLength}, 200 max`)
        .nullable(),
    });
  }

  // Método para definir las columnas en una tabla
  static createColumns(t: any) {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre',
        size: 200, // Ajusta según tus necesidades
      },
      {
        accessorKey: 'detalle',
        header: 'Detalle',
        size: 300, // Ajusta según tus necesidades
      },
      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 100,
      },
    ];
  }

  // Método para obtener las opciones de selección
  getSelectOptions() {
    return {
      value: this.id,
      label: this.nombre,
    };
  }
}

export default Industria;
