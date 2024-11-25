import * as Yup from 'yup';

class EstadoReunionProspecto {
  id: number | null;
  nombre: string | null;
  descripcion: string | null;

  constructor(data?: any) {
    this.id = data?.id || null;
    this.nombre = data?.nombre || null;
    this.descripcion = data?.descripcion || null;
  }

  // Método para obtener el esquema de validación usando Yup
  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string().max(
        100,
        `${t.validationMessages.maxLength}, 100 max`
      ),
      descripcion: Yup.string()
        .max(200, `${t.validationMessages.maxLength}, 200 max`)
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
        accessorKey: 'descripcion',
        header: 'Descripción',
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

export default EstadoReunionProspecto;
