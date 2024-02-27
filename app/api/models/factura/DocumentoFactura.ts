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

    monto : number  | null;
    idTipoMoneda:number | null;
    constructor(data?: any) {
      this.id = data?.id || 0;
      this.idFactura = data?.idFactura || 0;
      this.nombreDocumento = data?.nombreDocumento || "";
      this.contenidoDocumento = data?.contenidoDocumento || null;
      this.facturaPeriodo = data?.facturaPeriodo || null;
      this.fecha = data?.fecha || '';
      this.monto=data?.monto || null;
      this.idTipoMoneda=data?.idTipoMoneda|| null;
    }
  
    static getValidationSchema(t: any) {
      return Yup.object().shape({
        fecha: Yup.date().required(t.ValidationMessages.required),
        nombreDocumento: Yup.string().required(t.ValidationMessages.required),
        monto: Yup.number().required(t.ValidationMessages.required),
        idTipoMoneda: Yup.number().required(t.ValidationMessages.required),
      });
    }
  }
  
  export default DocumentoFactura;
  