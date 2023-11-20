import * as Yup from "yup";

class TipoServicio {
  tseId: number | null;
  tseNombre: string | null;
  tseDescripcion: string | null;
  tseVigente: boolean | null;

  constructor(data: any) {
    this.tseId = data?.tse_id || null;
    this.tseNombre = data?.tse_nombre || null;
    this.tseDescripcion = data?.tse_descripcion || null;
    this.tseVigente = data?.tse_vigente !== null ? Boolean(data.tse_vigente) : null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      tseId: Yup.number().nullable(),
      tseNombre: Yup.string().nullable(),
      tseDescripcion: Yup.string().nullable(),
      tseVigente: Yup.boolean().nullable(),
    });
  }
}

export default TipoServicio;
