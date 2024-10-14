import * as Yup from 'yup';
import ProyectoDesarrollo from './ProyectoDesarrollo';
import TipoHitoProyectoDesarrollo from './TipoHitoProyectoDesarrollo';

class HitoProyectoDesarrollo {
  id: number | 0;
  nombre: string | null;
  fechaCreacion: Date | null;
  idProyectoDesarrollo: number | null;
  idTipoPagoHito: number | null;
  monto: number | null;
  porcentajePagado: number | null;
  descripcion: string | null;
  // Relaciones
  proyectoDesarrollo: ProyectoDesarrollo | null;
  tipoHitoProyectoDesarrollo: TipoHitoProyectoDesarrollo | null;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.nombre = data?.nombre || null;
    this.fechaCreacion = data?.fechaCreacion
      ? new Date(data.fechaCreacion)
      : null;
    this.idProyectoDesarrollo = data?.idProyectoDesarrollo || null;
    this.idTipoPagoHito = data?.idTipoPagoHito || null;
    this.monto = data?.monto || null;
    this.porcentajePagado = data?.porcentajePagado || null;
    this.descripcion = data?.descripcion || null;
    // Relaciones
    this.proyectoDesarrollo = data?.proyectoDesarrollo || null;
    this.tipoHitoProyectoDesarrollo = data?.tipoHitoProyectoDesarrollo || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string()
        .required(t.ValidationMessages.required)
        .max(200, `${t.ValidationMessages.maxLength}, max 200 `),
      fechaCreacion: Yup.date().nullable(),
      idProyectoDesarrollo: Yup.number().nullable(),
      idTipoPagoHito: Yup.number().nullable(),
      monto: Yup.number().nullable(),
      porcentajePagado: Yup.number().nullable(),
      descripcion: Yup.string()
        .nullable()
        .max(500, `${t.ValidationMessages.maxLength}, max 500 `),
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
        header: 'Nombre del Hito',
        size: 200,
      },
      {
        accessorKey: 'tipoHitoProyectoDesarrollo.nombre',
        header: 'Tipo de Hito',
        size: 150,
      },
      {
        accessorKey: 'monto',
        header: 'Monto',
        size: 100,
      },
      {
        accessorKey: 'porcentajePagado',
        header: 'Porcentaje Pagado (%)',
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

export default HitoProyectoDesarrollo;
