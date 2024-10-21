import * as Yup from 'yup';
import PeriodosProyecto from '../proyecto/PeriodosProyecto';
import { format } from 'date-fns';
import DocumentoFactura from './DocumentoFactura';
import HorasUtilizadas from '../support/HorasUtilizadas';
import Soporte from '../support/Soporte';
import VentaLicencia from '../licencia/VentaLicencia';
import HitoProyectoDesarrollo from '../proyectoDesarrollo/HitoProyectoDesarrollo';
class FacturaPeriodo {
  id: number | null;
  rut: string | null;
  razonSocial: string | null;
  hesCodigo: string | null;
  ocCodigo: string | null;
  fechaHes: Date | null;
  fechaOc: Date | null;
  ordenPeriodo: number | null;
  observaciones: string | null;
  idPeriodo: number | null;
  monto: number | null;
  fechaFactura: Date | null;
  idEstado: number | null;
  fechaVencimiento: Date | null;
  idHorasUtilizadas: number | null;
  idSoporteBolsa: number | null;
  idLicencia: number | null;
  idBanco: number | null;
  fechaPago: Date | null;
  Soporte: Soporte | null;
  periodo: PeriodosProyecto | null;
  horasUtilizadas: HorasUtilizadas | null;
  ventaLicencia: VentaLicencia | null;
  documentosFactura: DocumentoFactura[] | null;

  // proyectos factura
  idHitoProyectoDesarrollo: number | null;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.rut = data?.rut || '';
    this.razonSocial = data?.razon_social || '';
    this.hesCodigo = data?.hes_codigo || '';
    this.ocCodigo = data?.oc_codigo || '';
    this.fechaHes = data?.fecha_hes ? new Date(data.fecha_hes) : null;
    this.fechaOc = data?.fecha_oc ? new Date(data.fecha_oc) : null;
    this.ordenPeriodo = data?.orden_periodo || 0;
    this.observaciones = data?.observaciones || '';
    this.idPeriodo = data?.id_periodo || null;
    this.monto = data?.monto || 0;
    this.fechaFactura = data?.fecha_factura
      ? new Date(data.fecha_factura)
      : null;
    this.idEstado = data?.id_estado || 1;
    this.fechaVencimiento = data?.fecha_vencimiento
      ? new Date(data.fecha_vencimiento)
      : null;
    this.periodo = data?.periodo ? new PeriodosProyecto(data.periodo) : null;
    this.documentosFactura = data?.documentosFactura || null;
    this.idHorasUtilizadas = data?.idHorasUtilizadas || null;
    this.horasUtilizadas = data?.horasUtilizadas || null;
    this.idLicencia = data?.idLicencia || null;
    this.ventaLicencia = data?.ventaLicencia || null;
    this.idBanco = data?.idBanco || null;
    this.fechaPago = data?.fecha_pago ? new Date(data.fecha_pago) : null;
    this.idHitoProyectoDesarrollo = data?.idHitoProyectoDesarrollo || null;
  }

  public getFechaString(date: Date | null): string | null {
    return date ? format(new Date(date), 'dd/MM/yyyy') : 'N/A';
  }

  static transformFacturaPeriodoData(facturaPeriodo: any) {
    const facturaPeriodoInstance = new FacturaPeriodo(facturaPeriodo);
    return {
      ...facturaPeriodo,
      _fechaHes: facturaPeriodo.fechaHes
        ? facturaPeriodoInstance.getFechaString(facturaPeriodo.fechaHes)
        : 'N/A',
      _fechaOc: facturaPeriodo.fechaOc
        ? facturaPeriodoInstance.getFechaString(facturaPeriodo.fechaOc)
        : 'N/A',
      _fechaFactura: facturaPeriodo.fechaFactura
        ? facturaPeriodoInstance.getFechaString(facturaPeriodo.fechaFactura)
        : 'N/A',
      _fechaVencimiento: facturaPeriodo.fechaVencimiento
        ? facturaPeriodoInstance.getFechaString(facturaPeriodo.fechaVencimiento)
        : 'N/A',
      _empresaPrestadora:
        facturaPeriodo.periodo?.proyecto?.empresaPrestadora?.nombre ??
        new HorasUtilizadas(facturaPeriodo.horasUtilizadas)?.proyecto
          ?.empresaPrestadora?.nombre ??
        new Soporte(facturaPeriodo.soporte)?.empresaPrestadora?.nombre ??
        new VentaLicencia(facturaPeriodo.ventaLicencia)?.empresaPrestadora
          ?.nombre ??
        new HitoProyectoDesarrollo(facturaPeriodo.hitoProyectoDesarrollo)
          ?.proyectoDesarrollo?.empresaPrestadora?.nombre ??
        'N/A',
    };
  }

  static createColumns(t?: any) {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'rut',
        header: t.Common.rut,
        size: 80,
      },
      {
        accessorKey: 'razonSocial',
        header: t.facture.businessName,
        size: 150,
      },
      {
        accessorKey: 'hesCodigo',
        header: 'HES',
        size: 100,
      },
      {
        accessorKey: 'ocCodigo',
        header: 'OC',
        size: 100,
      },
      {
        accessorKey: '_fechaHes',
        header: `${t.Common.date} HES`,
        size: 100,
      },
      {
        accessorKey: '_fechaOc',
        header: `${t.Common.date} OC`,
        size: 100,
      },
      // {
      //   accessorKey: "ordenPeriodo",
      //   header: "Orden de Período",
      //   size: 80,
      // },
      {
        accessorKey: 'observaciones',
        header: 'Observaciones',
        size: 200,
      },
      {
        accessorKey: 'monto',
        header: t.Common.amount,
        size: 80,
      },
      {
        accessorKey: '_fechaFactura',
        header: 'Fecha Factura',
        size: 100,
      },
      {
        accessorKey: 'estado.nombre',
        header: `${t.Common.status} Fact.`,
        size: 50,
      },
      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 100,
      },
    ];
  }
  static createColumnsFacturas(t?: any) {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'rut',
        header: t.Common.rut,
        size: 80,
      },
      {
        accessorKey: 'razonSocial',
        header: t.facture.businessName,
        size: 150,
      },
      {
        accessorKey: 'monto',
        header: t.Common.amount,
        size: 80,
      },
      {
        accessorKey: '_hito',
        header: `${t.Common.milestone}/${t.Common.period}`,
        size: 100,
      },
      // {
      //   accessorKey: "kam",
      //   header:t.Account.KAM,
      //   size:100,
      // },
      {
        accessorKey: '_fechaVencimiento',
        header: t.Common.expiration,
        size: 50,
      },
      {
        accessorKey: 'estado.nombre',
        header: `${t.Common.status} Fact.`,
        size: 50,
      },
      {
        accessorKey: '_empresaPrestadora',
        header: `Empresa Prestadora`,
        size: 50,
      },
      {
        accessorKey: 'observaciones',
        header: t.Common.observations,
        size: 50,
      },
      // {
      //   accessorKey: "_documento",
      //   header: `Documento`,
      //   size: 50,
      // },
      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 100,
      },
    ];
  }
  static getValidationSchema(t: any, maxMonto: number = 0) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      rut: Yup.string()
        .nullable()
        .max(20, 'El campo RUT no puede tener más de 20 caracteres.'),
      razonSocial: Yup.string()
        .nullable()
        .max(
          120,
          'El campo Razón Social no puede tener más de 120 caracteres.'
        ),
      hesCodigo: Yup.string()
        .nullable()
        .max(45, 'El campo HES Código no puede tener más de 45 caracteres.'),
      ocCodigo: Yup.string()
        .nullable()
        .max(45, 'El campo OC Código no puede tener más de 45 caracteres.'),
      fechaHes: Yup.date().nullable(),
      fechaOc: Yup.date().nullable(),
      ordenPeriodo: Yup.number().nullable(),
      observaciones: Yup.string()
        .nullable()
        .max(
          200,
          'El campo Observaciones no puede tener más de 200 caracteres.'
        ),
      idPeriodo: Yup.number().nullable(),
      monto: Yup.number()
        .test(
          'maxMonto',
          function (value) {
            if (maxMonto <= 0) {
              return 'No se puede crear porque el Monto ya cumple con el presupuesto';
            }
            return `El monto no puede exceder ${maxMonto}`;
          },
          function (value) {
            return maxMonto > 0 ? value <= maxMonto : false;
          }
        )
        .min(0.1, 'El monto debe ser mayor a 0'),
      fechaFactura: Yup.date().nullable(),
    });
  }
  static TIPO_FACTURA = {
    HES: 1,
    ORDEN_COMPRA: 2,
  };
  static ESTADO_FACTURA = {
    PENDIENTE: 1,
    SOLICITADA: 2,
    FACTURADA: 3,
    PAGADA: 4,
    ENVIADA: 5,
  };
}

export default FacturaPeriodo;
