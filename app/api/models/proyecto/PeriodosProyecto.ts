import * as Yup from 'yup';
import Proyecto from './Proyecto';

class PeriodosProyecto {
  id: number | null;
  idProyecto: number | null;
  fechaPeriodoDesde: Date | null;
  fechaPeriodoHasta: Date | null;
  estado: number | null;

  proyecto : Proyecto | null;

  constructor(data: any) {
    this.id = data?.id || null;
    this.idProyecto = data?.idProyecto || null;
    this.fechaPeriodoDesde = data?.fechaPeriodoDesde || null;
    this.fechaPeriodoHasta = data?.fechaPeriodoHasta || null;
    this.estado = data?.estado || null;
    this.proyecto=data?.proyecto || null
  }

  static getValidationSchema(t) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      idProyecto: Yup.number().nullable(),
      fechaPeriodoDesde: Yup.date().nullable(),
      fechaPeriodoHasta: Yup.date().nullable(),
      estado: Yup.number().nullable(),
    });
  }
}

export default PeriodosProyecto;
