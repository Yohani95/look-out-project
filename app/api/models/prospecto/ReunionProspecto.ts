import * as Yup from 'yup';

class ReunionProspecto {
  id: number | null;
  fechaCreacion: Date | null;
  solicitaPropuesta: boolean;
  idProspecto: number;
  detalle: string | null;
  fechaReunion: Date | null;
  constructor(data?: any) {
    this.id = data?.id || 0;
    this.fechaCreacion = data?.fechaCreacion || null;
    this.solicitaPropuesta = data?.solicitaPropuesta || false;
    this.idProspecto = data?.idProspecto || 0;
    this.detalle = data?.detalle || null;
    this.fechaReunion = data?.fechaReunion ? new Date(data.fechaReunion) : null;
  }

  // Método para obtener el esquema de validación usando Yup
  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      solicitaPropuesta: Yup.boolean().required(
        `${t.ValidationMessages.required}`
      ),
      idProspecto: Yup.number()
        .required(`${t.ValidationMessages.required}`)
        .min(1, `${t.ValidationMessages.min}, 1`),
      detalle: Yup.string()
        .max(255, `${t.ValidationMessages.maxLength}, 255 max`)
        .required(`${t.ValidationMessages.required}`),
    });
  }

  // Método para definir las columnas en una tabla
  static createColumns(t: any) {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'fechaCreacion',
        header: t.Common.creationDate,
        size: 100, // Ajusta según tus necesidades
      },
      {
        accessorKey: 'fechaReunion',
        header: `${t.Common.date} ${t.Common.meeting}`,
        size: 200, // Ajusta según tus necesidades
      },
      {
        accessorKey: 'solicitaPropuesta',
        header: t.Common.proposal,
        size: 100, // Ajusta según tus necesidades
      },
      {
        accessorKey: 'detalle',
        header: t.Common.description,
        size: 200, // Ajusta según tus necesidades
      },
      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 100,
      },
    ];
  }

  // Método para obtener las opciones de selección
  getSelectOptions() {
    return {
      value: this.id,
      label: this.detalle,
    };
  }
}

export default ReunionProspecto;
