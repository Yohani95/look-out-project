import * as Yup from 'yup';
import EtapaProyectoDesarrollo from './EtapaProyectoDesarrollo';
import ProyectoDesarrollo from './ProyectoDesarrollo';

class PlanificacionProyectoDesarrollo {
  id: number;
  nombre: string | null;
  porcentajeCargaTrabajo: number | null;
  idEtapa: number | null;
  lineaBase: boolean | null;
  idProyectoDesarrollo: number | null;
  fechaCreacion: Date | null; ///
  // Relaciones
  etapa: EtapaProyectoDesarrollo | null;
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
        header: 'Nombre de la Planificación',
        size: 200,
      },
      {
        accessorKey: 'etapa.nombre',
        header: 'Etapa',
        size: 150,
      },
      {
        accessorKey: 'porcentajeCargaTrabajo',
        header: 'Porcentaje Carga de Trabajo',
        size: 100,
      },
      {
        accessorKey: 'lineaBase',
        header: 'Línea Base',
        size: 100,
      },
      {
        accessorKey: 'fechaCreacion',
        header: t.Common.date,
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
