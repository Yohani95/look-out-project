import { format } from "date-fns";
import * as Yup from "yup";

class NovedadOportunidad {
  id: number | null;
  fecha: Date | null;
  nombre: string | null;
  descripcion: string | null;
  idOportunidad: number | null;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.fecha = data?.fecha ? new Date(data.fecha) : null;
    this.nombre = data?.nombre || "";
    this.descripcion = data?.descripcion || "";
    this.idOportunidad = data?.idOportunidad || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      nombre: Yup.string()
      .required(t.ValidationMessages.required)
      .max(255, t.ValidationMessages.maxLength),
    descripcion: Yup.string()
      .required(t.ValidationMessages.required)
      .max(255, t.ValidationMessages.maxLength),
      fecha: Yup.string().required(t.ValidationMessages.required),
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
        accessorKey: "descripcion",
        header: "Descripción",
        size: 200,
      },
      {
        accessorKey: "fecha",
        header: "Fecha",
        size: 100,
        // Cell: ({ value }: any) => (value ? new Date(value).toLocaleDateString() : ""),
      },
      {
        accessorKey: "actions",
        header: t.Common.actions,
        size: 100,
      },
    ];
  }
  getFechaString(): string | null {
    return this.fecha ? format(new Date(this.fecha), 'dd/MM/yyyy') : "N/A";
  }
}

export default NovedadOportunidad;
