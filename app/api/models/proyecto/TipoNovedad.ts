import * as Yup from "yup";

class TipoNovedad {
  id: number | null;
  nombre: string;
  descripcion: string | null;

  constructor(data?: any) {
    this.id = data?.id || null;
    this.nombre = data?.nombre || "";
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
        accessorKey: "descripcion",
        header: "Descripción",
        size: 200,
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

export default TipoNovedad;
