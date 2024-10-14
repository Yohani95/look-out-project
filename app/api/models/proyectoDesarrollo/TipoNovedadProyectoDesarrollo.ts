import * as Yup from 'yup';

class TipoNovedadProyectoDesarrollo {
  id: number | 0;
  nombre: string | null;
  descripcion: string | null;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.nombre = data?.nombre || null;
    this.descripcion = data?.descripcion || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string()
        .required(t.ValidationMessages.required)
        .max(200, `${t.ValidationMessages.maxLength}, max 200`),
      descripcion: Yup.string()
        .nullable()
        .max(500, `${t.ValidationMessages.maxLength}, max 500 `),
    });
  }

  static createColumns(t: any) {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre del Tipo de Novedad',
        size: 200,
      },
      {
        accessorKey: 'descripcion',
        header: 'Descripción',
        size: 250,
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
}

export default TipoNovedadProyectoDesarrollo;
