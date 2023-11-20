import * as Yup from "yup";

class Pais {
  paiId: number | null;
  paiNombre: string | null;
  lenId: number | null;

  constructor(data: any) {
    this.paiId = data?.pai_id || null;
    this.paiNombre = data?.pai_nombre || null;
    this.lenId = data?.len_id || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      paiId: Yup.number().nullable(),
      paiNombre: Yup.string().nullable(),
      lenId: Yup.number().nullable(),
    });
  }
}

export default Pais;
