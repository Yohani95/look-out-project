import * as Yup from 'yup';
import Industria from './Industria';

class Empresa {
  id: number | null;
  nombre: string | null;
  detalle: string | null;
  idIndustria: number | null;
  industria: Industria | null;
  constructor(data?: any) {
    this.id = data?.id || null;
    this.nombre = data?.nombre || null;
    this.detalle = data?.detalle || null;
    this.idIndustria = data?.idIndustria || null;
    this.industria = data?.industria || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string().nullable(), // Podrías agregar una longitud máxima si es necesario
      detalle: Yup.string().nullable(),
      idIndustria: Yup.number().nullable(),
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
        header: 'Nombre',
        size: 200, // Ajusta según tus necesidades
      },
      {
        accessorKey: 'detalle',
        header: 'Detalle',
        size: 300, // Ajusta según tus necesidades
      },
      {
        accessorKey: 'idIndustria',
        header: 'ID Industria',
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
}

export default Empresa;
