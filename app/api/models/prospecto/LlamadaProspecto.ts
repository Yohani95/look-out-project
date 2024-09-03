import * as Yup from 'yup';
import MedioLlamadaProspecto from './MedioLlamadaProspecto';

class LlamadaProspecto {
  id: number | null;
  fechaCreacion: Date | null;
  respondeLlamada: boolean | null;
  idProspecto: number;
  detalle: string | null;
  idMedioLlamadaProspecto: number | null;
  medioLlamadaProspecto: MedioLlamadaProspecto | null;
  constructor(data?: any) {
    this.id = data?.id || 0;
    this.fechaCreacion = data?.fechaCreacion || null;
    this.respondeLlamada = data?.respondeLlamada || false;
    this.idProspecto = data?.idProspecto || 0;
    this.detalle = data?.detalle || null;
    this.idMedioLlamadaProspecto = data?.idMedioLlamadaProspecto || null;
    this.medioLlamadaProspecto = data?.medioLlamadaProspecto || null;
  }

  // Método para obtener el esquema de validación usando Yup
  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      fechaCreacion: Yup.date().nullable(),
      respondeLlamada: Yup.boolean().required(t.ValidationMessages.required),
      idProspecto: Yup.number().nullable(),
      Detalle: Yup.string()
        .max(255, `${t.ValidationMessages.maxLength}, 255 max`)
        .nullable(),
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
        size: 100,
      },
      {
        accessorKey: 'respondeLlamada',
        header: t.Common.respondsCall,
        size: 50,
      },
      {
        accessorKey: 'medioLLamadaProspecto.nombre',
        header: t.Ficha.type,
        size: 50,
      },
      {
        accessorKey: 'detalle',
        header: t.Common.description,
        size: 300,
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

export default LlamadaProspecto;
