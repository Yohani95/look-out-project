import * as Yup from "yup";
import Soporte from "./Soporte";
class DocumentosSoporte {
    id: number | null;
    idSoporte: number | null;
    nombreDocumento: string | null;
    contenidoDocumento: string | null;
    
    soporte: Soporte | null;
    fecha: Date | null;
    archivo: any | null;
    idTipoDocumento:number|null;
    constructor(data?: any) {
      this.id = data?.id || 0;
      this.idSoporte = data?.idSoporte || 0;
      this.nombreDocumento = data?.nombreDocumento || "";
      this.contenidoDocumento = data?.contenidoDocumento || null;
      this.soporte = data?.soporte || null;
      this.fecha = data?.fecha || '';
      this.idTipoDocumento=data?.idTipoDocumento || null;
    }
  
    static getValidationSchema(t: any) {
      return Yup.object().shape({
        fecha: Yup.date().required(t.ValidationMessages.required),
        nombreDocumento: Yup.string().required(t.ValidationMessages.required),
        monto: Yup.number().required(t.ValidationMessages.required),
        idTipoMoneda: Yup.number().required(t.ValidationMessages.required),
      });
    }
    static TIPO_DOCUMENTO = {
      FACTURA: 1,
      OC: 2,
      HES:3,
      CONFIRMACION_CLIENTE:4,
      CONTRATO:5,
      KICK_OFF:6 
    };
  }
  
  export default DocumentosSoporte;
  