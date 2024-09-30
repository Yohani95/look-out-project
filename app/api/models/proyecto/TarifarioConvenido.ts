import * as Yup from 'yup';

class TarifarioConvenido {
  tcId: number | null;
  tcPerfilAsignado: number | null;
  tcTarifa: number | null;
  tcMoneda: number | null;
  tcBase: number | null;
  tcStatus: number | null;
  tcInicioVigencia: Date | null;
  tcTerminoVigencia: Date | null;
  comentariosGrales: string | null;
  prpId: number | null;

  constructor(data?: any) {
    this.tcId = data?.tcId || 0;
    this.tcPerfilAsignado = data?.tcPerfilAsignado || 0;
    this.tcTarifa = data?.tcTarifa || 0;
    this.tcMoneda = data?.tcMoneda || 0;
    this.tcBase = data?.tcBase || 0;
    this.tcStatus = data?.tcStatus || null;
    this.tcInicioVigencia = data?.tcInicioVigencia || null;
    this.tcTerminoVigencia = data?.tcTerminoVigencia || null;
    this.comentariosGrales = data?.comentariosGrales || null;
    this.prpId = data?.prpId || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      tcId: Yup.number().nullable(),
      tcPerfilAsignado: Yup.number().nullable(),
      tcTarifa: Yup.number().nullable(),
      tcMoneda: Yup.number().nullable(),
      tcBase: Yup.number().nullable(),
      tcStatus: Yup.number().nullable(),
      tcInicioVigencia: Yup.date().nullable(),
      tcTerminoVigencia: Yup.date().nullable(),
      comentariosGrales: Yup.string().max(1000).nullable(),
      prpId: Yup.number().nullable(),
    });
  }
  static createColumns(t: any) {
    return [
      {
        accessorKey: 'tcId',
        header: 'Id',
        size: 50,
      },
      {
        accessorKey: 'tcPerfilAsignado',
        header: t.business.assignedProfile,
        size: 150,
      },
      {
        accessorKey: 'tcTarifa',
        header: t.Common.fee,
        size: 100,
      },
      {
        accessorKey: 'tcMoneda',
        header: t.Common.currency,
        size: 100,
      },
      {
        accessorKey: 'tcBase',
        header: t.Common.base,
        size: 100,
      },
      {
        accessorKey: 'actions',
        header: 'Acciones',
        size: 100,
      },
    ];
  }
}

export default TarifarioConvenido;
