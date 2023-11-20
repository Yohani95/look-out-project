import * as Yup from "yup";

class Cliente {
  cliId: number | null;
  cliNombre: string | null;
  cliDescripcion: string | null;
  eclId: number | null;
  paiId: number | null;
  secId: number | null;
  girId: number | null;
  cliSitioWeb: string | null;
  cliNif: string | null;

  constructor(data: any) {
    this.cliId = data?.cli_id || null;
    this.cliNombre = data?.cli_nombre || null;
    this.cliDescripcion = data?.cli_descripcion || null;
    this.eclId = data?.ecl_id || null;
    this.paiId = data?.pai_id || null;
    this.secId = data?.sec_id || null;
    this.girId = data?.gir_id || null;
    this.cliSitioWeb = data?.cli_sitio_web || null;
    this.cliNif = data?.cli_nif || 'rut empresa';
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      cliId: Yup.number().nullable(),
      cliNombre: Yup.string().nullable(),
      cliDescripcion: Yup.string().required(t?.ValidationMessages.required),
      eclId: Yup.number().nullable(),
      paiId: Yup.number().required(t?.ValidationMessages.required),
      secId: Yup.number().nullable(),
      girId: Yup.number().nullable(),
      cliSitioWeb: Yup.string().nullable(),
      cliNif: Yup.string().nullable(),
    });
  }
}

export default Cliente;
