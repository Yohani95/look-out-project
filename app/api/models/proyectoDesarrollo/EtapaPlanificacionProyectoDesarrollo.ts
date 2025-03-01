import * as Yup from 'yup';

class EtapaPlanificacionProyectoDesarrollo {
  id: number | null;
  nombre: string | null;
  descripcion: string | null;

  constructor(data?: any) {
    this.id = data?.id || null;
    this.nombre = data?.nombre || null;
    this.descripcion = data?.descripcion || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string()
        .required(t.ValidationMessages.required)
        .max(200, t.ValidationMessages.maxLength),
      descripcion: Yup.string()
        .nullable()
        .max(500, t.ValidationMessages.maxLength),
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
        size: 100,
      },
      {
        accessorKey: 'descripcion',
        header: 'Descripción',
        size: 150,
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
  Constantes = {
    Kick_Off: 1,
    Preparacion: 3,
    Levantamiento: 2,
    Desarrollo: 4,
    QA_Interno: 5,
    QA_Externo: 6,
  };
}

export default EtapaPlanificacionProyectoDesarrollo;
