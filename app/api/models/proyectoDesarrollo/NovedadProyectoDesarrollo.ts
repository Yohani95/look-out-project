import * as Yup from 'yup';
import ProyectoDesarrollo from './ProyectoDesarrollo';
import TipoNovedadProyectoDesarrollo from './TipoNovedadProyectoDesarrollo';
import Persona from '../admin/Persona';

class NovedadProyectoDesarrollo {
  id: number | 0;
  nombre: string | null;
  fechaCreacion: Date | null;
  idProyectoDesarrollo: number | null;
  idTipoNovedadProyectoDesarrollo: number | null;
  descripcion: string | null;
  idKam: number | null;
  // Relaciones
  proyectoDesarrollo: ProyectoDesarrollo | null;
  tipoNovedad: TipoNovedadProyectoDesarrollo | null;
  persona: Persona | null;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.nombre = data?.nombre || null;
    this.fechaCreacion = data?.fechaCreacion
      ? new Date(data.fechaCreacion)
      : null;
    this.idProyectoDesarrollo = data?.idProyectoDesarrollo || null;
    this.idTipoNovedadProyectoDesarrollo =
      data?.idTipoNovedadProyectoDesarrollo || null;
    this.descripcion = data?.descripcion || null;
    this.idKam = data?.idKam || null;
    // Relaciones
    this.proyectoDesarrollo = data?.proyectoDesarrollo || null;
    this.tipoNovedad = data?.tipoNovedad || null;
    this.persona = data?.persona || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string()
        .required(t.ValidationMessages.required)
        .max(200, `${t.ValidationMessages.maxLength}. max 200 `),
      fechaCreacion: Yup.date().nullable(),
      idProyectoDesarrollo: Yup.number().nullable(),
      idTipoNovedadProyectoDesarrollo: Yup.number().nullable(),
      descripcion: Yup.string()
        .nullable()
        .max(500, `${t.ValidationMessages.maxLength}, max 500 `),
      idKam: Yup.number().nullable(),
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
        header: 'Nombre de la Novedad',
        size: 200,
      },
      {
        accessorKey: 'tipoNovedad.nombre',
        header: 'Tipo de Novedad',
        size: 150,
      },
      {
        accessorKey: 'descripcion',
        header: 'Descripción',
        size: 250,
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

export default NovedadProyectoDesarrollo;
