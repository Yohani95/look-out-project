import * as Yup from 'yup';

class MedioLlamadaProspecto {
  id: number | null;
  nombre: string | null;
  descripcion: string | null;

  constructor(data?: any) {
    this.id = data?.id || null;
    this.nombre = data?.nombre || '';
    this.descripcion = data?.descripcion || '';
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      nombre: Yup.string()
        .required(t.ValidationMessages.required)
        .max(100, `${t.ValidationMessages.maxLength} 100`),
      descripcion: Yup.string()
        .nullable()
        .max(200, `${t.ValidationMessages.maxLength} 200`),
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
        header: t.Common.name,
        size: 150,
      },
      {
        accessorKey: 'descripcion',
        header: t.Common.description,
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
}

export default MedioLlamadaProspecto;
