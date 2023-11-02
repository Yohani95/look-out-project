class Novedad {
  id: number;
  idPersona: number;
  idProyecto: number;
  fechaInicio: Date;
  fechaHasta: Date;
  IdPerfil: number;
  idTipoNovedad: number;
  observaciones: string;

  constructor(
    idPersona: number,
    idProyecto: number,
    fechaInicio: Date,
    fechaHasta: Date,
    IdPerfil: number,
    idTipoNovedad: number,
    observaciones: string
  ) {
    this.id = 0;
    this.idPersona = idPersona;
    this.idProyecto = idProyecto;
    this.fechaInicio = fechaInicio;
    this.fechaHasta = fechaHasta;
    this.IdPerfil = IdPerfil;
    this.observaciones = observaciones;
    this.idTipoNovedad = idTipoNovedad;
  }
}

export default Novedad;
