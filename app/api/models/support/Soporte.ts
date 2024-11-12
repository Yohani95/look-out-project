import * as Yup from 'yup';
import Cliente from '../cuenta/Cliente';
import TipoServicio from '../proyecto/TipoServicio';
import Pais from '../world/Pais';
import Persona from '../admin/Persona';
import TipoFacturacion from '../factura/TipoFacturacion';
import { format } from 'date-fns';
import EmpresaPrestadora from '../proyecto/EmpresaPrestadora';
import DiaPagos from '../factura/DiaPagos';
import DocumentosSoporte from './DocumentosSoporte';
class Soporte {
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
  months: number | null;
  cliente: Cliente | null;
  tipoServicio: TipoServicio | null;
  pais: Pais | null;
  contacto: Persona | null;
  idTipoFacturacion: number | null;
  tipoFacturacion: TipoFacturacion | null;
  idDiaPago: number | null;
  idEmpresaPrestadora: number | null;
  empresaPrestadora: EmpresaPrestadora | null;
  diaPagos: DiaPagos | null;
  valorHoraAdicional: number | null;
  valorHora: number | null;
  acumularHoras: boolean | null;
  numeroHoras: number | null;
  documentosSoporte: DocumentosSoporte[] | null;
  idTipoSoporte: number | null;
  constructor(data: any) {
    this.pryId = data?.pryId || 0;
    this.pryNombre = data?.pryNombre || '';
    this.prpId = data?.prpId || null;
    this.epyId = data?.epyId || null;
    this.tseId = data?.tseId || null;
    this.pryValor = data?.pryValor || 0;
    this.monId = data?.monId || 2;
    this.pryIdCliente = data?.pryIdCliente || 0;
    this.pryIdContacto = data?.pryIdContacto || 0;
    this.kamId = data?.kamId || null;
    this.paisId = data?.paisId || 0;
    this.fechaCorte = data?.fechaCorte || 1;
    this.months = data?.months || 1;
    this.idTipoFacturacion = data?.idTipoFacturacion || 0;
    this.idDiaPago = data?.idDiaPago || 0;
    this.idEmpresaPrestadora = data?.idEmpresaPrestadora || 0;
    this.empresaPrestadora = data?.empresaPrestadora || null;
    this.valorHoraAdicional = data?.valorHoraAdicional || null;
    this.valorHora = data?.valorHora || null;
    this.acumularHoras = data?.acumularHoras || false;
    this.numeroHoras = data?.numeroHoras || null;
    this.idTipoSoporte = data?.idTipoSoporte || null;
    //objetos
    this.cliente = data?.cliente || null;
    this.tipoServicio = data?.tipoServicio || null;
    this.pais = data?.pais || null;
    this.contacto = data?.contacto || null;
    this.tipoFacturacion = data?.tipoFacturacion || null;
    this.diaPagos = data?.diaPagos || null;
    this.documentosSoporte = data?.documentosSoporte || [];
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
    const schema = Soporte.getValidationSchema(null);
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
  static createColumns(t: any) {
    return [
      {
        accessorKey: 'pryId',
        header: t.Common.correlative,
        size: 50,
      },
      {
        accessorKey: 'pryNombre',
        header: t.Common.name,
        size: 150,
      },
      {
        accessorKey: 'cliente.cliNombre',
        header: t.Common.account,
        size: 150,
      },
      // {
      //   accessorKey: "tipoServicio.tseDescripcion",
      //   header: t.Account.type + " " + t.Account.business,
      //   size: 150,
      // },
      {
        accessorKey: '_pryFechaInicioEstimada',
        header: t.business.estimatedStartDate,
        size: 150,
      },
      {
        accessorKey: '_pryFechaCierreEstimada',
        header: t.business.estimatedClosingDate,
        size: 150,
      },
      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 100,
      },
      // Agregar más columnas según sea necesario
    ];
  }
  public getFechaString(date: Date | null): string | null {
    return date ? format(new Date(date), 'dd/MM/yyyy') : 'N/A';
  }
  static transformFacturaPeriodoData(soporte: any) {
    const SoporteInstance = new Soporte(soporte);
    return {
      ...soporte,
      _pryFechaInicioEstimada: SoporteInstance.getFechaString(
        soporte.pryFechaInicioEstimada
      ),
      _pryFechaCierreEstimada: SoporteInstance.getFechaString(
        soporte.pryFechaCierreEstimada
      ),
    };
  }
  getPeriodoCompleto(): string {
    const formato = 'dd/MM/yyyy';
    return `${format(this.pryFechaInicioEstimada, formato)} - ${format(
      this.pryFechaCierreEstimada,
      formato
    )}`;
  }
}

export default Soporte;
