import * as Yup from 'yup';
import Pais from '../world/Pais';
import Persona from '../admin/Persona';

class Cliente {
  cliId: number | null;
  cliNombre: string | null;
  cliDescripcion: string | null;
  eclId: number | null;
  paiId: number | null;
  secId: number | null;
  girId: number | null;
  cliSitioWeb: string | null;
  cliNif: string | null;
  pais: Pais | null;
  kam: Persona | null;
  constructor(data: any) {
    this.cliId = data?.cli_id || null;
    this.cliNombre = data?.cli_nombre || null;
    this.cliDescripcion = data?.cli_descripcion || null;
    this.eclId = data?.ecl_id || null;
    this.paiId = data?.pai_id || null;
    this.secId = data?.sec_id || null;
    this.girId = data?.gir_id || null;
    this.cliSitioWeb = data?.cli_sitio_web || null;
    this.cliNif = data?.cli_nif || 'rut empresa';
    this.pais = data?.pais;
    this.kam = data?.kam || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      cliId: Yup.number().nullable(),
      cliNombre: Yup.string().nullable(),
      cliDescripcion: Yup.string().required(t?.ValidationMessages.required),
      eclId: Yup.number().nullable(),
      paiId: Yup.number().required(t?.ValidationMessages.required),
      secId: Yup.number().nullable(),
      girId: Yup.number().nullable(),
      cliSitioWeb: Yup.string().nullable(),
      cliNif: Yup.string().nullable(),
    });
  }
  static createColumns(t: any) {
    return [
      {
        accessorKey: 'cliId',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'cliNombre',
        header: 'Nombre',
        size: 100,
      },
      {
        accessorKey: 'pais',
        header: t.Ficha.country,
        size: 100,
      },
      {
        accessorKey: 'sectorComercial',
        header: t.Ficha.place,
        size: 100,
      },
      {
        accessorKey: 'email',
        header: t.Ficha.Email,
        size: 100,
      },
      {
        accessorKey: 'kam',
        header: 'KAM',
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
      value: this.cliId,
      label: this.cliNombre,
    };
  }
}

export default Cliente;
