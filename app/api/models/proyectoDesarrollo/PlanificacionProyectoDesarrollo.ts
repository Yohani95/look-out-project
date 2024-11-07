import * as Yup from 'yup';
import ProyectoDesarrollo from './ProyectoDesarrollo';
import EtapaPlanificacionProyectoDesarrollo from './EtapaPlanificacionProyectoDesarrollo';

class PlanificacionProyectoDesarrollo {
  id: number;
  nombre: string | null;
  porcentajeCargaTrabajo: number | null;
  idEtapa: number | null;
  lineaBase: boolean | null;
  idProyectoDesarrollo: number | null;
  fechaCreacion: Date | null; ///
  fechaInicio: Date | null;
  fechaActividad: Date | null;
  fechaTermino: Date | null; ///
  fechaTerminoReal: Date | null;
  terminado: boolean | null;
  // Relaciones
  etapa: EtapaPlanificacionProyectoDesarrollo | null;
  //proyectoDesarrollo: ProyectoDesarrollo | null;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.nombre = data?.nombre || null;
    this.porcentajeCargaTrabajo = data?.porcentajeCargaTrabajo || null;
    this.idEtapa = data?.idEtapa || null;
    this.lineaBase = data?.lineaBase || null;
    this.idProyectoDesarrollo = data?.idProyectoDesarrollo || null;
    this.fechaCreacion = data?.fechaCreacion
      ? new Date(data.fechaCreacion)
      : null;
    this.fechaInicio = data?.fechaInicio ? new Date(data.fechaInicio) : null;
    this.fechaActividad = data?.fechaActividad
      ? new Date(data.fechaActividad)
      : null;
    this.fechaTermino = data?.fechaTermino ? new Date(data.fechaTermino) : null;
    this.fechaTerminoReal = data?.fechaTerminoReal
      ? new Date(data.fechaTerminoReal)
      : null;
    this.terminado = data?.terminado || null;
    // Relaciones
    this.etapa = data?.etapa || null;
    //this.proyectoDesarrollo = data?.proyectoDesarrollo || null;
  }

  // Esquema de validación usando Yupstatic getValidationSchema(t: any) {
  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string()
        .nullable()
        .max(255, `${t.ValidationMessages.maxLength}. max 255`),
      porcentajeCargaTrabajo: Yup.number()
        .required(t.ValidationMessages.required) // Cambia esto si quieres que sea obligatorio
        .min(1, `${t.ValidationMessages.discountMin}. min 1`)
        .max(100, `${t.ValidationMessages.discountMax}. max 100`),
      idEtapa: Yup.number().nullable(),
      lineaBase: Yup.boolean().nullable(),
      idProyectoDesarrollo: Yup.number().nullable(),
    });
  }

  // Columnas para una tabla
  static createColumns(t: any) {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'nombre',
        header: t.Common.name,
        size: 50,
      },
      {
        accessorKey: 'etapa.nombre',
        header: t.project.stage,
        size: 150,
      },
      {
        accessorKey: 'porcentajeCargaTrabajo',
        header: `${t.project.percentageWork}`,
        size: 100,
      },
      {
        accessorKey: 'fechaInicio',
        header: t.project.dateStart,
        size: 100,
      },
      {
        accessorKey: 'fechaTermino',
        header: t.project.dateEnd,
        size: 100,
      },
      {
        accessorKey: 'fechaActividad',
        header: `${t.project.dateStart} Real`,
        size: 100,
      },
      {
        accessorKey: 'fechaTerminoReal',
        header: `${t.project.dateEnd} Real`,
        size: 100,
      },
      {
        accessorKey: 'terminado',
        header: t.project.finishedStage,
        size: 100,
      },
      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 100,
      },
    ];
  }

  // Método para opciones de selección
  getSelectOptions() {
    return {
      value: this.id,
      label: this.nombre,
    };
  }
}

export default PlanificacionProyectoDesarrollo;
