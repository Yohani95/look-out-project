import * as Yup from "yup";
import Proyecto from "./Proyecto";

class PeriodosProyecto {
  id: number | null;
  pryId: number | null;
  fechaPeriodoDesde: Date | null;
  fechaPeriodoHasta: Date | null;
  estado: number | null;
  monto: number | null;
  numeroProfesionales: number | null;

  proyecto: Proyecto | null;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.pryId = data?.pryId || null;
    this.fechaPeriodoDesde = data? new Date(data.fechaPeriodoDesde) : null;
    this.fechaPeriodoHasta = data? new Date(data.fechaPeriodoHasta) : null;
    this.estado = data?.estado || 0;
    this.monto = data?.monto || 0;
    this.numeroProfesionales = data?.numeroProfesionales || 0;

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
    });
  }
  static createColumns(t) {
    return [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "fechaPeriodoDesde",
        header: t.Common.period,
        size: 200,
      },
      {
        accessorKey: "numeroProfesionales",
        header: `N° ${t.Common.professionals}`,
        size: 50,
      },
      {
        accessorKey: "fechacierre",
        header: `${t.Common.date} ${t.Common.close}`,
        size: 150,
      },
      {
        accessorKey: "estado",
        header: t.Common.status,
        size: 50,
      },
      {
        accessorKey: "actions",
        header: t.Common.actions,
        size: 100,
      },
    ];
  }
  getPeriodoCompleto(): string {
    return `${this.fechaPeriodoDesde.toLocaleDateString()} - ${this.fechaPeriodoHasta.toLocaleDateString()}`;
  }
}

export default PeriodosProyecto;
