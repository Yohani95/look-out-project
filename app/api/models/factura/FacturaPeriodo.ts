import * as Yup from "yup";
import PeriodosProyecto from "../proyecto/PeriodosProyecto";

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

  periodo: PeriodosProyecto | null;

  constructor(data?: any) {
    this.id = data?.id || null;
    this.rut = data?.rut || null;
    this.razonSocial = data?.razon_social || null;
    this.hesCodigo = data?.hes_codigo || null;
    this.ocCodigo = data?.oc_codigo || null;
    this.fechaHes = data?.fecha_hes ? new Date(data.fecha_hes) : null;
    this.fechaOc = data?.fecha_oc ? new Date(data.fecha_oc) : null;
    this.ordenPeriodo = data?.orden_periodo || null;
    this.observaciones = data?.observaciones || null;
    this.idPeriodo = data?.id_periodo || null;
    this.monto = data?.monto || null;
    this.fechaFactura = data?.fecha_factura ? new Date(data.fecha_factura) : null;

    this.periodo = data?.periodo ? new PeriodosProyecto(data.periodo) : null;
  }

  public getFechaString(date: Date | null): string | null {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  }

  static transformFacturaPeriodoData(facturaPeriodo: any) {
    const facturaPeriodoInstance = new FacturaPeriodo(facturaPeriodo);
    return {
      ...facturaPeriodo,
      _fechaHes: facturaPeriodoInstance.getFechaString(facturaPeriodo.fechaHes),
      _fechaOc: facturaPeriodoInstance.getFechaString(facturaPeriodo.fechaOc),
      _fechaFactura: facturaPeriodoInstance.getFechaString(facturaPeriodo.fechaFactura),
    };
  }

  static createColumns(t: any) {
    return [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "rut",
        header: "RUT",
        size: 80,
      },
      {
        accessorKey: "razonSocial",
        header: "Razón Social",
        size: 150,
      },
      {
        accessorKey: "hesCodigo",
        header: "HES Código",
        size: 100,
      },
      {
        accessorKey: "ocCodigo",
        header: "OC Código",
        size: 100,
      },
      {
        accessorKey: "fechaHes",
        header: "Fecha HES",
        size: 100,
        transform: (value: Date | null) => value ? new Date(value).toLocaleDateString() : "N/A",
      },
      {
        accessorKey: "fechaOc",
        header: "Fecha OC",
        size: 100,
        transform: (value: Date | null) => value ? new Date(value).toLocaleDateString() : "N/A",
      },
      {
        accessorKey: "ordenPeriodo",
        header: "Orden de Período",
        size: 80,
      },
      {
        accessorKey: "observaciones",
        header: "Observaciones",
        size: 200,
      },
      {
        accessorKey: "idPeriodo",
        header: "ID de Período",
        size: 80,
      },
      {
        accessorKey: "monto",
        header: "Monto",
        size: 80,
      },
      {
        accessorKey: "fechaFactura",
        header: "Fecha Factura",
        size: 100,
        transform: (value: Date | null) => value ? new Date(value).toLocaleDateString() : "N/A",
      },
    ];
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      rut: Yup.string().nullable().max(20, "El campo RUT no puede tener más de 20 caracteres."),
      razonSocial: Yup.string().nullable().max(120, "El campo Razón Social no puede tener más de 120 caracteres."),
      hesCodigo: Yup.string().nullable().max(45, "El campo HES Código no puede tener más de 45 caracteres."),
      ocCodigo: Yup.string().nullable().max(45, "El campo OC Código no puede tener más de 45 caracteres."),
      fechaHes: Yup.date().nullable(),
      fechaOc: Yup.date().nullable(),
      ordenPeriodo: Yup.number().nullable(),
      observaciones: Yup.string().nullable().max(200, "El campo Observaciones no puede tener más de 200 caracteres."),
      idPeriodo: Yup.number().nullable(),
      monto: Yup.number().nullable(),
      fechaFactura: Yup.date().nullable(),
    });
  }
}

export default FacturaPeriodo;
