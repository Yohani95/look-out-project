import { Moneda } from './../world/Moneda';
import * as Yup from 'yup';
import EstadoVentaLicencia from './EstadoVentaLicencia';
import Persona from '../admin/Persona';
import Cliente from '../cuenta/Cliente';
import DiaPagos from '../factura/DiaPagos';
import { format } from 'date-fns';
import EmpresaPrestadora from '../proyecto/EmpresaPrestadora';

class VentaLicencia {
  id: number | null;
  nombre: string;
  fechaCierre: Date | null;
  fechaCreacion: Date | null;
  fechaRenovacion: Date | null;
  idEstado: number | null;
  idCliente: number | null;
  idContacto: number | null;
  idKam: number | null;
  idMoneda: number | null;
  monto: number | null;
  idPais: number | null;
  idTipoFacturacion: number | null;
  idTipoLicencia: number | null;
  idEmpresaPrestadora: number | null;
  descuento: number | null;
  idDiaPago: number | null;
  estadoVentaLicencia: EstadoVentaLicencia | null;
  kam: Persona | null;
  cliente: Cliente | null;
  diaPagos: DiaPagos | null;
  empresaPrestadora: EmpresaPrestadora | null;
  descripcion: string | null;
  Moneda: Moneda | null;
  constructor(data?: any) {
    this.id = data?.id || 0;
    this.nombre = data?.nombre || '';
    this.fechaCierre = data?.fechaCierre ? new Date(data.fechaCierre) : null;
    this.fechaCreacion = data?.fechaCreacion
      ? new Date(data.fechaCreacion)
      : null;
    this.fechaRenovacion = data?.fechaRenovacion
      ? new Date(data.fechaRenovacion)
      : null;
    this.idEstado = data?.idEstado || null;
    this.idCliente = data?.idCliente || null;
    this.idContacto = data?.idContacto || null;
    this.idKam = data?.idKam || null;
    this.idMoneda = data?.idMoneda || null;
    this.monto = data?.monto || null;
    this.idPais = data?.idPais || null;
    this.idTipoFacturacion = data?.idTipoFacturacion || null;
    this.idTipoLicencia = data?.idTipoLicencia || null;
    this.descuento = data?.descuento || null;
    this.idEmpresaPrestadora = data?.idEmpresaPrestadora || null;
    this.descripcion = data?.descripcion || null;
    //relaciones
    this.estadoVentaLicencia = data?.estadoVentaLicencia || null;
    this.kam = data?.kam || null;
    this.cliente = data?.cliente || null;
    this.idDiaPago = data?.idDiaPago || null;
    this.diaPagos = data?.diaPagos || null;
    this.empresaPrestadora = data?.empresaPrestadora || null;
    this.Moneda = data?.Moneda || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string().required(t.ValidationMessages.required),
      fechaCierre: Yup.date().nullable(),
      fechaCreacion: Yup.date().nullable(),
      fechaRenovacion: Yup.date().nullable(),
      idEstado: Yup.number().nullable(),
      idCliente: Yup.number().nullable(),
      idContacto: Yup.number().nullable(),
      idKam: Yup.number().nullable(),
      idMoneda: Yup.number().nullable(),
      monto: Yup.number().nullable(),
      idPais: Yup.number().nullable(),
      idTipoFacturacion: Yup.number().nullable(),
      idTipoLicencia: Yup.number().nullable(),
      descuento: Yup.number()
        .nullable()
        .min(1, t.ValidationMessages.discountMin)
        .max(100, t.ValidationMessages.discountMax),
      descripcion: Yup.string()
        .nullable()
        .max(500, `${t.ValidationMessages.maxLength} 500 max`),
    });
  }

  static createColumns(t: any) {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'nombre',
        header: t.Common.name,
        size: 200,
      },
      {
        accessorKey: 'cliente.cliNombre',
        header: t.Common.account,
        size: 200,
      },
      {
        accessorKey: 'moneda.monNombre',
        header: t.Common.currency,
        size: 50,
      },
      {
        accessorKey: 'monto',
        header: t.Common.amount,
        size: 50,
      },
      {
        accessorKey: 'fechaCierre',
        header: t.Common.deadline,
        size: 150,
      },
      {
        accessorKey: 'fechaCreacion',
        header: t.Common.creationDate,
        size: 150,
      },
      {
        accessorKey: 'fechaRenovacion',
        header: t.Common.renewalDate,
        size: 150,
      },
      {
        accessorKey: 'estadoVentaLicencia.nombre',
        header: t.Common.status,
        size: 100,
      },
      {
        accessorKey: 'actions',
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
  getPeriodoCompleto(): string {
    const formato = 'dd/MM/yyyy';
    return `${format(this.fechaCreacion, formato)} - ${format(
      this.fechaRenovacion,
      formato
    )}`;
  }
}

export default VentaLicencia;
