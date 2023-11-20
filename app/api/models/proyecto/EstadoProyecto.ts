import * as Yup from "yup";

class EstadoProyecto {
  epyId: number | null;
  epyNombre: string | null;
  epyDescripcion: string | null;

  constructor(data: any) {
    this.epyId = data?.epy_id || null;
    this.epyNombre = data?.epy_nombre || null;
    this.epyDescripcion = data?.epy_descripcion || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      epyId: Yup.number().nullable(),
      epyNombre: Yup.string().nullable(),
      epyDescripcion: Yup.string().nullable(),
    });
  }
}

export default EstadoProyecto;
