import * as Yup from 'yup';

class FacturaAdaptacion {
  id: number | null;
  fechaCreacion: Date | null;
  monto: number | null;
  idCliente: number | null;
  descripcion: string | null;
  montoDiferencia: number | null;
  idLicencia: number | null;
  idSoporte: number | null;
  idPeriodoProyecto: number | null;
  idHorasUtilizadas: number | null;
  constructor(data?: any) {
    this.id = data?.id || 0;
    this.fechaCreacion = data?.fechaCreacion || null;
    this.monto = data?.monto || null;
    this.idCliente = data?.idCliente || null;
    this.descripcion = data?.descripcion || null;
    this.montoDiferencia = data?.montoDiferencia || null;
    this.idLicencia = data?.idLicencia || null;
    this.idSoporte = data?.idSoporte || null;
    this.idPeriodoProyecto = data?.idPeriodoProyecto || null;
    this.idHorasUtilizadas = data?.idHorasUtilizadas || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      // id: Yup.number().nullable(),
      // fechaCreacion: Yup.date().nullable(),
      monto: Yup.number()
        .required(t.ValidationMessages.required)
        .min(0, t.ValidationMessages.min), // Ajusta el límite según
      // idFactura: Yup.number().nullable(),
      descripcion: Yup.string()
        .required(t.ValidationMessages.required)
        .max(255, t.ValidationMessages.maxLength), // Ajusta el límite según sea necesario
      // montoDiferencia: Yup.number().nullable(),
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
        accessorKey: 'fechaCreacion',
        header: `${t.Common.creationDate}`,
        size: 150,
      },
      {
        accessorKey: 'monto',
        header: `${t.Common.amount}`,
        size: 100,
      },
      {
        accessorKey: 'idFactura',
        header: `${t.Common.invoiceId}`,
        size: 100,
      },
      {
        accessorKey: 'descripcion',
        header: `${t.Common.description}`,
        size: 200,
      },
      {
        accessorKey: 'montoDiferencia',
        header: `${t.Common.differenceAmount}`,
        size: 100,
      },
      // Agregar más columnas según sea necesario
    ];
  }

  getSelectOptions() {
    return {
      value: this.id,
      label: this.descripcion,
    };
  }
}

export default FacturaAdaptacion;
