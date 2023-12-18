import * as Yup from "yup";
import Cliente from "../cuenta/Cliente";
import TipoServicio from "./TipoServicio";
import Pais from "../world/Pais";
import Persona from "../admin/Persona";

class Proyecto {
  pryId: number | null;
  pryNombre: string | null;
  prpId: number | null;
  epyId: number | null;
  tseId: number | null;
  pryFechaInicioEstimada: Date | null;
  pryValor: number | null;
  monId: number | null;
  pryIdCliente: number | null;
  pryFechaCierreEstimada: Date | null;
  pryFechaCierre: Date | null;
  pryIdContacto: number | null;
  kamId: number | null;
  paisId: number | null;
  fechaCorte: number | null;
  months:number| null;
  cliente: Cliente | null;
  tipoServicio: TipoServicio | null;
  pais: Pais | null;
  contacto: Persona| null;
  facturacionDiaHabil: number| null;
  constructor(data: any) {
    this.pryId = data?.pryId || 0;
    this.pryNombre = data?.pryNombre || "";
    this.prpId = data?.prpId || null;
    this.epyId = data?.epyId || null;
    this.tseId = data?.tseId || 0;
    this.pryValor = data?.pryValor || 0;
    this.monId = data?.monId || null;
    this.pryIdCliente = data?.pryIdCliente || 0;
    this.pryIdContacto = data?.pryIdContacto || 0;
    this.kamId = data?.kamId || null;
    this.paisId = data?.paisId || 0;
    this.fechaCorte=data?.fechaCorte || 1 ;
    this.months=data?.months || 1 ;
    this.facturacionDiaHabil=data?.facturacionDiaHabil ||0;
    //objetos
    this.cliente = data?.cliente || null;
    this.tipoServicio = data?.tipoServicio || null;
    this.pais = data?.pais || null;
    this.contacto = data?.contacto || null;

    // Manejo de fechas
    this.pryFechaInicioEstimada = this.isValidDate(data?.pryFechaInicioEstimada)
      ? new Date(data.pryFechaInicioEstimada)
      : null;

    this.pryFechaCierreEstimada = this.isValidDate(data?.pryFechaCierreEstimada)
      ? new Date(data.pryFechaCierreEstimada)
      : null;

    this.pryFechaCierre = this.isValidDate(data?.pryFechaCierre)
      ? new Date(data.pryFechaCierre)
      : null;
  }
  isValidDate(date: any): boolean {
    return date && !isNaN(new Date(date).getTime());
  }
  private validateData(data: any) {
    const schema = Proyecto.getValidationSchema(null);
    schema.validateSync(data, { abortEarly: false });
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      pryId: Yup.number().nullable(),
      pryNombre: Yup.string()
        .required(t?.ValidationMessages.required)
        .max(50, t?.ValidationMessages.maxLength),
      prpId: Yup.number().nullable(),
      epyId: Yup.number().nullable(),
      tseId: Yup.number().nullable(),
      pryFechaInicioEstimada: Yup.date().nullable(),
      pryValor: Yup.number().nullable(),
      monId: Yup.number().nullable(),
      pryIdCliente: Yup.number().nullable(),
      pryFechaCierreEstimada: Yup.date().nullable(),
      pryFechaCierre: Yup.date().nullable(),
      pryIdContacto: Yup.number().nullable(),
      kamId: Yup.number().nullable(),
      paiId: Yup.number().nullable(),
      fechaCorte: Yup.number().nullable(),
    });
  }
}
export default Proyecto;
