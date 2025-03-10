import * as Yup from 'yup';
import Proyecto from './Proyecto';
import { format } from 'date-fns';
import DiaPagos from '../factura/DiaPagos';
class PeriodosProyecto {
  id: number | null;
  pryId: number | null;
  fechaPeriodoDesde: Date | null;
  fechaPeriodoHasta: Date | null;
  estado: number | null;
  monto: number | null;
  numeroProfesionales: number | null;
  diasTotal: number | null;
  proyecto: Proyecto | null;
  constructor(data?: any) {
    this.id = data?.id || 0;
    this.pryId = data?.pryId || null;
    this.fechaPeriodoDesde = data ? new Date(data.fechaPeriodoDesde) : null;
    this.fechaPeriodoHasta = data ? new Date(data.fechaPeriodoHasta) : null;
    this.estado = data?.estado || 0;
    this.monto = data?.monto || 0;
    this.numeroProfesionales = data?.numeroProfesionales || 0;
    this.diasTotal = data?.diasTotal || 0;
    this.proyecto = data?.proyecto || null;
  }

  static getValidationSchema(t) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      pryId: Yup.number().nullable(),
      fechaPeriodoDesde: Yup.date().nullable(),
      fechaPeriodoHasta: Yup.date().nullable(),
      estado: Yup.number().nullable(),
      monto: Yup.number().nullable(),
      numeroProfesionales: Yup.number().nullable(),
      diasTotal: Yup.number().nullable(),
      montoDiario: Yup.number().nullable(),
    });
  }
  static createColumns(t) {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'fechaPeriodoDesde',
        header: t.Common.period,
        size: 200,
      },
      {
        accessorKey: 'numeroProfesionales',
        header: `N° ${t.Common.professionals}`,
        size: 50,
      },
      {
        accessorKey: 'fechacierre',
        header: `${t.Common.date} ${t.Common.close}`,
        size: 150,
      },
      {
        accessorKey: 'monto',
        header: `${t.Common.amount}`,
        size: 150,
      },
      {
        accessorKey: 'diasTotal',
        header: `${t.Common.totalDays}`,
        size: 150,
      },
      {
        accessorKey: 'estado',
        header: t.Common.status,
        size: 50,
      },
      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 100,
      },
    ];
  }

  getEstados(t): string {
    if (this.estado === 1) {
      return t.Common.closed; // Estado 1: Totalmente facturado
    } else if (this.estado === 2) {
      return t.Common.partiallyInvoiced; // Estado 2: Parcialmente facturado
    } else {
      return t.Common.preclosed; // Estado 0: Sin facturar
    }
  }

  getPeriodoCompleto(): string {
    const formato = 'dd/MM/yyyy';
    return `${format(this.fechaPeriodoDesde, formato)} - ${format(
      this.fechaPeriodoHasta,
      formato
    )}`;
  }
}
export default PeriodosProyecto;
