import * as Yup from "yup";
import { format } from 'date-fns';
import Soporte from "./Soporte";
class HorasUtilizadas {
  id: any | null;
  createTime: Date | null;
  nombreDocumento: string | null;
  contenidoDocumento: Blob | null;
  horas: number | null;
  idSoporte: number | null;
  fechaPeriodoDesde: Date | null;
  fechaPeriodoHasta: Date | null;
  estado: boolean | null;
  monto:number | null;
  montoHorasExtras: number| null;
  horasExtras: number | null;
  horasAcumuladas:number| null;
  proyecto : Soporte | null;
  constructor(data?: any) {
    this.id = data?.id || 0;
    this.createTime = data?.createTime || null;
    this.nombreDocumento = data?.nombreDocumento || null;
    this.contenidoDocumento = data?.contenidoDocumento || null;
    this.horas = data?.horas || null;
    this.idSoporte = data?.idSoporte || null;
    this.fechaPeriodoDesde = data? new Date(data.fechaPeriodoDesde) : null;
    this.fechaPeriodoHasta = data? new Date(data.fechaPeriodoHasta) : null;
    this.estado = data?.estado || false;
    this.monto=data?.monto|| null;
    this.montoHorasExtras=data?.montoHorasExtras || null;
    this.horasExtras=data?.montoHorasExtras || null;
    this.horasAcumuladas=data?.horasAcumuladas|| null;
    this.proyecto = data?.soporte || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      createTime: Yup.date().nullable(),
      nombreDocumento: Yup.string()
        .nullable()
        .max(255, t.ValidationMessages.maxLength),
      contenidoDocumento: Yup.mixed().nullable(),
      horas: Yup.number().nullable(),
      idSoporte: Yup.number().nullable(),
      fechaPeriodoDesde: Yup.date().nullable(),
      fechaPeriodoHasta: Yup.date().nullable(),
      estado: Yup.boolean().nullable(),
    });
  }

  static createColumns(t: any) {
    return [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "_fechaPeriodoDesde",
        header: "Fecha Periodo Desde",
        size: 150,
      },
      {
        accessorKey: "_fechaPeriodoHasta",
        header: "Fecha Periodo Hasta",
        size: 150,
      },
      {
        accessorKey: "horas",
        header: "Horas",
        size: 150,
      },
      {
        accessorKey: "horasExtras",
        header: "Horas extras",
        size: 150,
      },
      {
        accessorKey: "monto",
        header: "Monto",
        size: 150,
      },
      {
        accessorKey: "montoHorasExtras",
        header: "Monto Horas Extras",
        size: 150,
      },
      {
        accessorKey: "_montoTotal",
        header: "Monto Total",
        size: 150,
      },
      {
        accessorKey: "horasAcumuladas",
        header: "Horas Acumuladas",
        size: 150,
      },
      {
        accessorKey: "estado",
        header: "Estado",
        size: 150,
      },
      {
        accessorKey: "actions",
        header: "acciones",
        size: 150,
      },
      // Agregar más columnas según sea necesario
    ];
  }
  static createColumnsBag(t: any) {
    return [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "_fechaPeriodoDesde",
        header: "Fecha Periodo Desde",
        size: 150,
      },
      {
        accessorKey: "_fechaPeriodoHasta",
        header: "Fecha Periodo Hasta",
        size: 150,
      },
      {
        accessorKey: "horas",
        header: "Horas",
        size: 150,
      },
      {
        accessorKey: "horasAcumuladas",
        header: "Horas Restantes",
        size: 150,
      },
      // {
      //   accessorKey: "estado",
      //   header: "Estado",
      //   size: 150,
      // },
      {
        accessorKey: "actions",
        header: "Acciones",
        size: 150,
      },
      // Agregar más columnas según sea necesario
    ];
  }
  static createColumnsOnDemand(t: any) {
    return [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "_fechaPeriodoDesde",
        header: "Fecha Periodo Desde",
        size: 150,
      },
      {
        accessorKey: "_fechaPeriodoHasta",
        header: "Fecha Periodo Hasta",
        size: 150,
      },
      {
        accessorKey: "horas",
        header: "Horas",
        size: 150,
      },
      {
        accessorKey: "monto",
        header: "Monto",
        size: 150,
      },
      {
        accessorKey: "estado",
        header: "Estado",
        size: 150,
      },
      {
        accessorKey: "actions",
        header: "Acciones",
        size: 150,
      },
      // Agregar más columnas según sea necesario
    ];
  }

  getSelectOptions() {
    return {
      value: this.id,
      label: this.nombreDocumento,
    };
  }
  public getFechaString(date: Date | null): string | null {
    return date ? format(new Date(date), 'dd/MM/yyyy') : "N/A";
  }
  static transformHorasUtilizadasData(horas: any) {
    const soporteHours = new HorasUtilizadas(horas);
    return {
      ...horas,
      _fechaPeriodoDesde: soporteHours.getFechaString(horas.fechaPeriodoDesde),
      _fechaPeriodoHasta: soporteHours.getFechaString(horas.fechaPeriodoHasta),
      _montoTotal: soporteHours.monto+soporteHours.montoHorasExtras,
    };
  }
  getEstados(t): string {
    return this.estado? t.Common.closed:t.Common.preclosed;
  }
  getPeriodoCompleto(): string {
    const formato = 'dd/MM/yyyy';
    return `${format(this.fechaPeriodoDesde, formato)} - ${format(this.fechaPeriodoHasta, formato)}`;
  }
}

export default HorasUtilizadas;
