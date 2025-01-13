import * as Yup from 'yup';

class RolFuncionalidad {
  id: number | null;
  rolId: number | null;
  funcionalidadRol: number | null;
  tieneAcceso: boolean | null;
  constructor(data?: any) {
    this.id = data?.id || null;
    this.rolId = data?.rolId || null;
    this.funcionalidadRol = data?.funcionalidadRol || null;
    this.tieneAcceso = data?.tieneAcceso || false;
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
        accessorKey: 'rolId',
        header: 'Nombre',
        size: 200,
      },
      {
        accessorKey: 'funcionalidadRol',
        header: 'Descripción',
        size: 200,
      },
      {
        accessorKey: 'tieneAcceso',
        header: 'tieneAcceso',
        size: 200,
      },
      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 100,
      },
    ];
  }
}
export default RolFuncionalidad;
