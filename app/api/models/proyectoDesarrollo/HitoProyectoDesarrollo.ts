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
  hitoCumplido: boolean | null;
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
    this.hitoCumplido = data?.hitoCumplido || null;
    // Relaciones
    this.proyectoDesarrollo = data?.proyectoDesarrollo || null;
    this.tipoHitoProyectoDesarrollo = data?.tipoHitoProyectoDesarrollo || null;
    this.proyectoDesarrollo = data?.proyectoDesarrollo || null;
  }

  static getValidationSchema(
    t: any,
    montoRestante: number,
    porcentajeRestante: number,
    montoAlmacenado?: number // Este es el valor previamente almacenado
  ) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string()
        .required(t.ValidationMessages.required)
        .max(200, `${t.ValidationMessages.maxLength}, max 200 `),
      fechaCreacion: Yup.date().nullable(),
      idProyectoDesarrollo: Yup.number().nullable(),
      idTipoPagoHito: Yup.number().nullable(),
      monto: Yup.number()
        .nullable()
        .test('max-montoRestante-o-almacenado', function (value) {
          // Si es creación (montoAlmacenado no está disponible)
          if (montoAlmacenado === undefined || montoAlmacenado === null) {
            return (
              value === null ||
              value <= montoRestante ||
              this.createError({
                message: `El monto no puede ser mayor que ${montoRestante}`,
              })
            );
          }

          // En caso de edición
          if (montoRestante === 0) {
            // Si el monto restante es 0, solo permitir hasta el monto almacenado
            return (
              value === null ||
              value <= montoAlmacenado ||
              this.createError({
                message: `El monto no puede ser mayor que ${montoAlmacenado}`,
              })
            );
          }

          // Si hay monto restante, permitir suma de montoRestante + montoAlmacenado
          return (
            value === null ||
            value <= montoRestante + montoAlmacenado ||
            this.createError({
              message: `El monto no puede ser mayor que ${
                montoRestante + montoAlmacenado
              }`,
            })
          );
        }),
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
        accessorKey: 'hitoCumplido',
        header: t.Common.milestoneAccomplished,
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
