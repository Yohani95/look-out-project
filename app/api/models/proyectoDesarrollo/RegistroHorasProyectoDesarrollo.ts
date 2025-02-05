import ProfesionalProyectoDesarrollo from './ProfesionalProyectoDesarrollo';
import * as Yup from 'yup';

class RegistroHorasProyectoDesarrollo {
  id: number | 0;
  idProfesionalProyecto: number | null;
  semana: Date | null;
  horasTrabajadas: number | 0.0;
  // Relaciones
  profesionalProyecto: ProfesionalProyectoDesarrollo | null;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.idProfesionalProyecto = data?.idProfesionalProyecto || null;
    this.semana = data?.semana ? new Date(data.semana) : null;
    this.horasTrabajadas = data?.horasTrabajadas || 0.0;
    // Relaciones
    this.profesionalProyecto = data?.profesionalProyecto || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      idProfesionalProyecto: Yup.number().required(
        t.ValidationMessages.required
      ),
      semana: Yup.date().required(t.ValidationMessages.required),
      horasTrabajadas: Yup.number()
        .required(t.ValidationMessages.required)
        .min(0, t.ValidationMessages.positive)
        .max(168, t.ValidationMessages.maxHours),
    });
  }

  static createColumns(t: any) {
    return [
      { accessorKey: 'id', header: 'ID', size: 50 },
      // {
      //   accessorKey: 'profesionalProyecto.persona.perNombres',
      //   header: 'Profesional',
      //   size: 200,
      // },
      { accessorKey: 'semana', header: 'Semana', size: 150 },
      { accessorKey: 'horasTrabajadas', header: 'Horas Trabajadas', size: 150 },
      { accessorKey: 'actions', header: t.Common.actions, size: 100 },
    ];
  }

  getSelectOptions() {
    return {
      value: this.id,
      label: `${
        this.profesionalProyecto?.persona?.perNombres
      } - ${this.semana?.toLocaleDateString()}`,
    };
  }
}

export default RegistroHorasProyectoDesarrollo;
