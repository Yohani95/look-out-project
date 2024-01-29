import * as Yup from "yup";
import FacturaPeriodo from "./FacturaPeriodo";
class DocumentoFactura {
    id: number | null;
    idFactura: number | null;
    nombreDocumento: string | null;
    contenidoDocumento: string | null;
    
    facturaPeriodo: FacturaPeriodo | null;
    fecha: Date | null;
    archivo: any | null;
    constructor(data?: any) {
      this.id = data?.id || 0;
      this.idFactura = data?.idFactura || 0;
      this.nombreDocumento = data?.nombreDocumento || "";
      this.contenidoDocumento = data?.contenidoDocumento || null;
      this.facturaPeriodo = data?.facturaPeriodo || null;
    }
  
    static getValidationSchema(t: any) {
      return Yup.object().shape({
        nombreDocumento: Yup.string().required(t.ValidationMessages.required),
      });
    }
  }
  
  export default DocumentoFactura;
  