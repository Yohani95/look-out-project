import * as Yup from 'yup';
import Moneda from '../world/Moneda';

class TarifarioVentaLicencia {
  id: number | null;
  idMarcaLicencia: number | null;
  idMayoristaLicencia: number | null;
  fechaTermino: Date | null;
  fechaVigencia: Date | null;
  valor: number | null;
  idLicencia: number | null;
  idVentaLicencia: number | null;
  idMoneda: number | null;
  // Other properties...
  moneda: Moneda | null;
  cantidad: number | null;
  constructor(data?: any) {
    this.id = data?.id || 0;
    this.idMarcaLicencia = data?.idMarcaLicencia || null;
    this.idMayoristaLicencia = data?.idMayoristaLicencia || null;
    this.fechaTermino = data?.fechaTermino ? new Date(data.fechaTermino) : null;
    this.fechaVigencia = data?.fechaVigencia
      ? new Date(data.fechaVigencia)
      : null;
    this.valor = data?.valor || null;
    this.idLicencia = data?.idLicencia || null;
    this.idVentaLicencia = data?.idVentaLicencia || null;
    this.idMoneda = data?.idMoneda || null;
    this.moneda = data?.moneda || null;
    this.cantidad = data?.cantidad || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      idMarcaLicencia: Yup.number().required(t.ValidationMessages.required),
      idMayoristaLicencia: Yup.number().required(t.ValidationMessages.required),
      fechaTermino: Yup.date().nullable(),
      fechaVigencia: Yup.date().nullable(),
      valor: Yup.number().nullable(),
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
        accessorKey: 'tipoLicencia.nombre',
        header: t.Common.license,
        size: 50,
      },
      {
        accessorKey: 'marcaLicencia.nombre',
        header: t.Common.brand,
        size: 50,
      },
      {
        accessorKey: 'mayoristaLicencia.nombre',
        header: t.Common.wholesaler,
        size: 50,
      },
      {
        accessorKey: 'fechaVigencia',
        header: t.business.beginningValidity,
        size: 50,
      },
      {
        accessorKey: 'fechaTermino',
        header: t.business.termValidity,
        size: 50,
      },
      {
        accessorKey: 'valor',
        header: t.Common.amount,
        size: 50,
      },
      {
        accessorKey: 'cantidad',
        header: 'N°',
        size: 50,
      },
      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 80,
      },
    ];
  }

  getSelectOptions() {
    return {
      value: this.id,
      label: `${this.idMarcaLicencia} - ${this.idMayoristaLicencia}`,
    };
  }
}

export default TarifarioVentaLicencia;
