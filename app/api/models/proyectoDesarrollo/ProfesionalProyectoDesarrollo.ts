import ProyectoDesarrollo from './ProyectoDesarrollo';
import Persona from '../admin/Persona';
import * as Yup from 'yup';

class ProfesionalProyectoDesarrollo {
  id: number | 0;
  fechaInicio: Date | null;
  fechaTermino: Date | null;
  idPersona: number | null;
  idProyectoDesarrollo: number | null;
  // Relaciones
  persona: Persona | null;
  proyectoDesarrollo: ProyectoDesarrollo | null;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.fechaInicio = data?.fechaInicio ? new Date(data.fechaInicio) : null;
    this.fechaTermino = data?.fechaTermino ? new Date(data.fechaTermino) : null;
    this.idPersona = data?.idPersona || null;
    this.idProyectoDesarrollo = data?.idProyectoDesarrollo || null;
    // Relaciones
    this.persona = data?.persona || null;
    this.proyectoDesarrollo = data?.proyectoDesarrollo || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      fechaInicio: Yup.date().required(t.ValidationMessages.required),
      fechaTermino: Yup.date()
        .nullable()
        .min(Yup.ref('fechaInicio'), t.ValidationMessages.dateAfterStart),
      idPersona: Yup.number().required(t.ValidationMessages.required),
      idProyectoDesarrollo: Yup.number().required(
        t.ValidationMessages.required
      ),
    });
  }

  static createColumns(t: any) {
    return [
      { accessorKey: 'id', header: 'ID', size: 50 },
      { accessorKey: 'nombre', header: t.Common.name, size: 200 },
      { accessorKey: 'fechaInicio', header: 'Fecha Inicio', size: 150 },
      { accessorKey: 'fechaTermino', header: 'Fecha Término', size: 150 },
      { accessorKey: 'actions', header: t.Common.actions, size: 100 },
    ];
  }

  getSelectOptions() {
    return { value: this.id, label: this.persona?.perNombres || 'Sin Asignar' };
  }
}

export default ProfesionalProyectoDesarrollo;
