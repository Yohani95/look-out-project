import * as Yup from "yup";

class MayoristaLicencia {
  id: number | null;
  nombre: string;
  telefono: string | null;
  estado: boolean;

  constructor(data?: any) {
    this.id = data?.id || null;
    this.nombre = data?.nombre || "";
    this.telefono = data?.telefono || null;
    this.estado = data?.estado ?? true;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string()
        .max(50, t.validationMessages.maxLength(50))
        .required(t.validationMessages.required),
      telefono: Yup.string()
        .max(15, t.validationMessages.maxLength(15))
        .nullable(),
      estado: Yup.boolean().required(t.validationMessages.required),
    });
  }

  static createColumns(t: any) {
    return [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "nombre",
        header: "Nombre",
        size: 200,
      },
      {
        accessorKey: "telefono",
        header: "Teléfono",
        size: 100,
      },
      {
        accessorKey: "estado",
        header: "Estado",
        size: 50,
        Cell: ({ row }) => (row.original.estado ? "Activo" : "Inactivo"),
      },
      {
        accessorKey: "actions",
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

export default MayoristaLicencia;
