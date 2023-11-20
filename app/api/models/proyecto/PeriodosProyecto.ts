import * as Yup from "yup";

class PeriodoProyecto {
  id: number;
  idProyecto: number | null;
  fechaPeriodoDesde: Date | null;
  fechaPeriodoHasta: Date | null;
  estado: number | null;

  constructor(
    id: number,
    idProyecto: number | null,
    fechaPeriodoDesde: Date | null,
    fechaPeriodoHasta: Date | null,
    estado: number | null
  ) {
    this.id = id;
    this.idProyecto = idProyecto;
    this.fechaPeriodoDesde = fechaPeriodoDesde;
    this.fechaPeriodoHasta = fechaPeriodoHasta;
    this.estado = estado;
  }

  static validationRules = (t: any) =>
    Yup.object().shape({
      idProyecto: Yup.number().nullable(),
      fechaPeriodoDesde: Yup.date().nullable(),
      fechaPeriodoHasta: Yup.date().nullable(),
      estado: Yup.number().nullable(),
    });
}

export default PeriodoProyecto