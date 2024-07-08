
import * as Yup from "yup";

class EstadoVentaLicencia {
  id: number | null;
  nombre: string;
  descripcion: string | null;

  constructor(data?: any) {
    this.id = data?.id || null;
    this.nombre = data?.nombre || "";
    this.descripcion = data?.descripcion || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string().required(t.validationMessages.required),
      descripcion: Yup.string().nullable(),
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

  static Constantes = {
    PROPUESTA_EN_PREPARACION: 1,
    ENVIADA_A_CLIENTE: 2,
    PERDIDA: 3,
    GANADA: 4,
  };
}

export default EstadoVentaLicencia;
