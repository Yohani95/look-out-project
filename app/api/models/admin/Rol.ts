import * as Yup from 'yup';
export interface Rol {
  rolNombre: string | null;
  rolDescripcion: string | null;
  rolId: number;
}

export class RolClass {
  rolId: number | null;
  rolNombre: string;
  rolDescripcion: string | null;

  constructor(data?: any) {
    this.rolId = data?.rolId || null;
    this.rolNombre = data?.rolNombre || '';
    this.rolDescripcion = data?.rolDescripcion || null;
  }

  static getValidationSchema(t) {
    return Yup.object().shape({
      rolId: Yup.number().nullable(),
      rolNombre: Yup.string().required(''),
      rolDescripcion: Yup.string().nullable(),
    });
  }

  static createColumns(t) {
    return [
      {
        accessorKey: 'rolId',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'rolNombre',
        header: 'Nombre',
        size: 200,
      },
      {
        accessorKey: 'rolDescripcion',
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
      value: this.rolId,
      label: this.rolNombre,
    };
  }
}
